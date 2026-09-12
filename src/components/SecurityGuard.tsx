"use client"

import { useState, useEffect } from "react"
import { Shield, AlertTriangle, Lock, CheckCircle, XCircle } from "lucide-react"
import {
  validateTransactionRequest,
  recordTransaction,
  recordFailedAttempt,
  getSecurityStatus,
  logSecurityEvent,
  generateSecureToken,
  requiresAdditionalConfirmation
} from "@/lib/security"
import { cn } from "@/lib/utils"

interface SecurityGuardProps {
  onTransactionApproved: (token: string) => void
  onTransactionRejected: (reason: string) => void
  amount: number
  merchantId: string
  userId?: string
}

export default function SecurityGuard({
  onTransactionApproved,
  onTransactionRejected,
  amount,
  merchantId,
  userId
}: SecurityGuardProps) {
  const [securityStatus, setSecurityStatus] = useState(getSecurityStatus())
  const [isValidating, setIsValidating] = useState(false)
  const [requiresPin, setRequiresPin] = useState(false)
  const [pin, setPin] = useState("")
  const [securityMessage, setSecurityMessage] = useState("")
  const [securityLevel, setSecurityLevel] = useState<"safe" | "warning" | "danger">("safe")

  useEffect(() => {
    // Update security status periodically
    const interval = setInterval(() => {
      setSecurityStatus(getSecurityStatus())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const validateAndProceed = async () => {
    setIsValidating(true)

    // Perform comprehensive security validation
    const validation = validateTransactionRequest({
      amount,
      merchantId,
      userId
    })

    if (!validation.valid) {
      setSecurityMessage(validation.error || "Transação inválida")
      setSecurityLevel("danger")
      recordFailedAttempt()
      onTransactionRejected(validation.error || "Transação inválida")
      setIsValidating(false)
      return
    }

    if (validation.suspicious) {
      setSecurityMessage("Atividade suspeita detectada. Requer verificação adicional.")
      setSecurityLevel("warning")
      setRequiresPin(true)
      setIsValidating(false)
      return
    }

    if (validation.requiresConfirmation) {
      setRequiresPin(true)
      setSecurityMessage("Transação de alto valor. Confirme com seu PIN.")
      setSecurityLevel("warning")
      setIsValidating(false)
      return
    }

    // Transaction is safe to proceed
    await executeTransaction()
  }

  const executeTransaction = async () => {
    try {
      // Generate secure token for this transaction
      const token = generateSecureToken()

      // Log the security event
      logSecurityEvent({
        action: "TRANSACTION_APPROVED",
        userId,
        details: {
          amount,
          merchantId,
          token: token.substring(0, 8) + "..." // Log partial token only
        }
      })

      // Record the transaction for rate limiting
      recordTransaction()

      // Proceed with transaction
      onTransactionApproved(token)
    } catch (error) {
      setSecurityMessage("Erro ao processar transação. Tente novamente.")
      setSecurityLevel("danger")
      recordFailedAttempt()
      onTransactionRejected("Erro ao processar transação")
    } finally {
      setIsValidating(false)
    }
  }

  const handlePinSubmit = () => {
    if (pin.length !== 4) {
      setSecurityMessage("PIN deve ter 4 dígitos")
      setSecurityLevel("danger")
      return
    }

    // In a real app, validate against stored PIN
    // For demo, accept any 4-digit PIN
    setIsValidating(true)
    setTimeout(() => {
      executeTransaction()
    }, 500)
  }

  if (securityStatus.isLocked) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Lock className="w-6 h-6 text-red-600" />
          <h3 className="text-lg font-semibold text-red-900">Conta temporariamente bloqueada</h3>
        </div>
        <p className="text-red-700 mb-4">
          Muitas tentativas falhas. Sua conta está bloqueada por{" "}
          {Math.ceil(securityStatus.lockoutRemaining / 1000)} segundos.
        </p>
        <div className="bg-red-100 rounded-lg p-3">
          <p className="text-sm text-red-800">
            Por segurança, aguarde o período de bloqueio antes de tentar novamente.
            Se precisar de ajuda imediata, entre em contato com o suporte.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Security Status Indicator */}
      <div className={cn(
        "rounded-xl p-4 border",
        securityLevel === "safe" && "bg-green-50 border-green-200",
        securityLevel === "warning" && "bg-yellow-50 border-yellow-200",
        securityLevel === "danger" && "bg-red-50 border-red-200"
      )}>
        <div className="flex items-center space-x-3">
          {securityLevel === "safe" && <CheckCircle className="w-5 h-5 text-green-600" />}
          {securityLevel === "warning" && <AlertTriangle className="w-5 h-5 text-yellow-600" />}
          {securityLevel === "danger" && <XCircle className="w-5 h-5 text-red-600" />}
          <div className="flex-1">
            <p className={cn(
              "font-medium",
              securityLevel === "safe" && "text-green-900",
              securityLevel === "warning" && "text-yellow-900",
              securityLevel === "danger" && "text-red-900"
            )}>
              {securityLevel === "safe" && "Transação segura"}
              {securityLevel === "warning" && "Atenção necessária"}
              {securityLevel === "danger" && "Transação bloqueada"}
            </p>
            {securityMessage && (
              <p className={cn(
                "text-sm mt-1",
                securityLevel === "safe" && "text-green-700",
                securityLevel === "warning" && "text-yellow-700",
                securityLevel === "danger" && "text-red-700"
              )}>
                {securityMessage}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Security Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-medium text-blue-900 mb-2">Proteções de segurança ativas</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>✓ Validação de valor e limites</li>
              <li>✓ Controle de frequência de transações</li>
              <li>✓ Detecção de atividades suspeitas</li>
              <li>✓ Sanitização de dados de entrada</li>
              <li>✓ Tokens de segurança criptografados</li>
              <li>✓ Registro de auditoria de segurança</li>
            </ul>
          </div>
        </div>
      </div>

      {/* PIN Entry (if required) */}
      {requiresPin && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h4 className="font-medium text-gray-900 mb-4">Confirme sua identidade</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                PIN de segurança (4 dígitos)
              </label>
              <input
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest"
                placeholder="••••"
              />
            </div>
            <button
              onClick={handlePinSubmit}
              disabled={pin.length !== 4 || isValidating}
              className={cn(
                "w-full py-3 rounded-lg font-medium text-white transition-colors",
                pin.length === 4 && !isValidating
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              )}
            >
              {isValidating ? "Validando..." : "Confirmar transação"}
            </button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {!requiresPin && (
        <div className="flex space-x-3">
          <button
            onClick={validateAndProceed}
            disabled={isValidating || securityStatus.isLocked}
            className={cn(
              "flex-1 py-3 rounded-lg font-medium text-white transition-colors",
              isValidating || securityStatus.isLocked
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            )}
          >
            {isValidating ? "Validando segurança..." : "Prosseguir com transação"}
          </button>
          <button
            onClick={() => onTransactionRejected("Cancelado pelo usuário")}
            className="px-6 py-3 rounded-lg font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
        </div>
      )}

      {/* Security Stats (for demo) */}
      <div className="text-xs text-gray-500 text-center">
        <p>Tentativas falhas: {securityStatus.failedAttempts} | Status: {securityStatus.suspiciousActivity ? "Atenção" : "Normal"}</p>
      </div>
    </div>
  )
}
