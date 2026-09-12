/**
 * Security Guardrails for Multiverse Wallet
 * Protection against malicious prompts and common attacks
 */

// Rate limiting configuration
const RATE_LIMITS = {
  transactions: {
    maxPerHour: 10,
    maxPerDay: 50,
    cooldownMs: 30000 // 30 seconds between transactions
  },
  loginAttempts: {
    maxAttempts: 5,
    lockoutMs: 300000 // 5 minutes
  },
  apiCalls: {
    maxPerMinute: 100
  }
};

// Transaction limits
const TRANSACTION_LIMITS = {
  maxSingleTransaction: 10000, // MCC
  maxDailyTotal: 50000, // MCC
  minTransaction: 0.01, // MCC
  requireConfirmationAbove: 100 // MCC
};

// Security state
interface SecurityState {
  transactionHistory: number[];
  lastTransactionTime: number;
  failedAttempts: number;
  lockoutUntil: number | null;
  suspiciousActivityDetected: boolean;
}

let securityState: SecurityState = {
  transactionHistory: [],
  lastTransactionTime: 0,
  failedAttempts: 0,
  lockoutUntil: null,
  suspiciousActivityDetected: false
};

/**
 * Sanitize user input to prevent XSS attacks
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';

  // Remove potentially dangerous characters
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers like onclick=
    .replace(/data:/gi, '') // Remove data: protocol
    .replace(/vbscript:/gi, '') // Remove vbscript: protocol
    .trim()
    .substring(0, 1000); // Limit length
}

/**
 * Validate amount to prevent invalid transactions
 */
export function validateAmount(amount: number): { valid: boolean; error?: string } {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return { valid: false, error: 'Valor inválido' };
  }

  if (amount < TRANSACTION_LIMITS.minTransaction) {
    return { valid: false, error: `Valor mínimo é ${TRANSACTION_LIMITS.minTransaction} MCC` };
  }

  if (amount > TRANSACTION_LIMITS.maxSingleTransaction) {
    return { valid: false, error: `Valor máximo é ${TRANSACTION_LIMITS.maxSingleTransaction} MCC` };
  }

  if (amount <= 0) {
    return { valid: false, error: 'Valor deve ser positivo' };
  }

  return { valid: true };
}

/**
 * Check rate limiting for transactions
 */
export function checkRateLimit(): { allowed: boolean; error?: string; waitTime?: number } {
  const now = Date.now();

  // Check if locked out
  if (securityState.lockoutUntil && now < securityState.lockoutUntil) {
    const waitTime = Math.ceil((securityState.lockoutUntil - now) / 1000);
    return {
      allowed: false,
      error: 'Muitas tentativas. Tente novamente mais tarde.',
      waitTime
    };
  }

  // Check cooldown between transactions
  if (securityState.lastTransactionTime) {
    const timeSinceLastTransaction = now - securityState.lastTransactionTime;
    if (timeSinceLastTransaction < RATE_LIMITS.transactions.cooldownMs) {
      const waitTime = Math.ceil((RATE_LIMITS.transactions.cooldownMs - timeSinceLastTransaction) / 1000);
      return {
        allowed: false,
        error: 'Aguarde antes de fazer outra transação.',
        waitTime
      };
    }
  }

  // Check hourly limit
  const oneHourAgo = now - 3600000;
  const recentTransactions = securityState.transactionHistory.filter(
    timestamp => timestamp > oneHourAgo
  );

  if (recentTransactions.length >= RATE_LIMITS.transactions.maxPerHour) {
    return {
      allowed: false,
      error: 'Limite de transações por hora atingido.'
    };
  }

  // Check daily limit
  const oneDayAgo = now - 86400000;
  const dailyTransactions = securityState.transactionHistory.filter(
    timestamp => timestamp > oneDayAgo
  );

  if (dailyTransactions.length >= RATE_LIMITS.transactions.maxPerDay) {
    return {
      allowed: false,
      error: 'Limite de transações por dia atingido.'
    };
  }

  return { allowed: true };
}

/**
 * Record a transaction for rate limiting
 */
export function recordTransaction(): void {
  const now = Date.now();
  securityState.transactionHistory.push(now);
  securityState.lastTransactionTime = now;
  securityState.failedAttempts = 0; // Reset on success
}

/**
 * Record a failed attempt
 */
export function recordFailedAttempt(): void {
  securityState.failedAttempts++;

  if (securityState.failedAttempts >= RATE_LIMITS.loginAttempts.maxAttempts) {
    securityState.lockoutUntil = Date.now() + RATE_LIMITS.loginAttempts.lockoutMs;
    securityState.suspiciousActivityDetected = true;
  }
}

/**
 * Check if additional confirmation is needed
 */
export function requiresAdditionalConfirmation(amount: number): boolean {
  return amount >= TRANSACTION_LIMITS.requireConfirmationAbove;
}

/**
 * Validate merchant ID to prevent injection
 */
export function validateMerchantId(merchantId: string): { valid: boolean; error?: string } {
  if (typeof merchantId !== 'string') {
    return { valid: false, error: 'ID de estabelecimento inválido' };
  }

  const sanitized = sanitizeInput(merchantId);

  // Check if it matches expected format (alphanumeric and specific characters)
  if (!/^[a-zA-Z0-9-_]+$/.test(sanitized)) {
    return { valid: false, error: 'ID de estabelecimento contém caracteres inválidos' };
  }

  if (sanitized.length > 50 || sanitized.length < 1) {
    return { valid: false, error: 'ID de estabelecimento com tamanho inválido' };
  }

  return { valid: true };
}

/**
 * Detect suspicious activity patterns
 */
export function detectSuspiciousActivity(pattern: {
  amount: number;
  frequency: number;
  timeOfDay: number;
}): { suspicious: boolean; reason?: string } {
  const { amount, frequency, timeOfDay } = pattern;

  // Unusual amount
  if (amount > TRANSACTION_LIMITS.maxSingleTransaction * 0.8) {
    return { suspicious: true, reason: 'Valor acima do normal' };
  }

  // High frequency
  if (frequency > RATE_LIMITS.transactions.maxPerHour * 0.5) {
    return { suspicious: true, reason: 'Alta frequência de transações' };
  }

  // Unusual time (e.g., 2 AM - 5 AM)
  if (timeOfDay >= 2 && timeOfDay <= 5) {
    return { suspicious: true, reason: 'Horário incomum' };
  }

  return { suspicious: false };
}

/**
 * Encrypt sensitive data (basic encryption for demo)
 * In production, use proper encryption libraries
 */
export function encryptData(data: string): string {
  // This is a simple XOR encryption for demonstration
  // In production, use AES-256 or similar
  const key = 'multiverse-secure-key-2024';
  let encrypted = '';

  for (let i = 0; i < data.length; i++) {
    encrypted += String.fromCharCode(
      data.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    );
  }

  return btoa(encrypted); // Base64 encode
}

/**
 * Decrypt sensitive data
 */
export function decryptData(encrypted: string): string {
  try {
    const key = 'multiverse-secure-key-2024';
    const decoded = atob(encrypted); // Base64 decode
    let decrypted = '';

    for (let i = 0; i < decoded.length; i++) {
      decrypted += String.fromCharCode(
        decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      );
    }

    return decrypted;
  } catch {
    return '';
  }
}

/**
 * Generate secure random token
 */
export function generateSecureToken(): string {
  const array = new Uint32Array(4);
  crypto.getRandomValues(array);
  return Array.from(array, dec => dec.toString(16)).join('');
}

/**
 * Validate PIN (simulated biometric/auth)
 */
export function validatePIN(pin: string, storedPin: string): { valid: boolean; error?: string } {
  if (typeof pin !== 'string' || pin.length !== 4) {
    return { valid: false, error: 'PIN deve ter 4 dígitos' };
  }

  if (!/^\d+$/.test(pin)) {
    return { valid: false, error: 'PIN deve conter apenas números' };
  }

  if (pin !== storedPin) {
    recordFailedAttempt();
    return { valid: false, error: 'PIN incorreto' };
  }

  // Reset failed attempts on success
  securityState.failedAttempts = 0;
  return { valid: true };
}

/**
 * Security audit log
 */
interface AuditLogEntry {
  timestamp: number;
  action: string;
  userId?: string;
  details: Record<string, any>;
  ip?: string;
  userAgent?: string;
}

const auditLog: AuditLogEntry[] = [];

export function logSecurityEvent(entry: Omit<AuditLogEntry, 'timestamp'>): void {
  auditLog.push({
    ...entry,
    timestamp: Date.now()
  });

  // Keep only last 1000 entries
  if (auditLog.length > 1000) {
    auditLog.shift();
  }

  // In production, send to secure logging service
  console.log('[SECURITY AUDIT]', entry);
}

/**
 * Get security status
 */
export function getSecurityStatus(): {
  isLocked: boolean;
  suspiciousActivity: boolean;
  failedAttempts: number;
  lockoutRemaining: number;
} {
  const now = Date.now();
  const lockoutRemaining = securityState.lockoutUntil
    ? Math.max(0, securityState.lockoutUntil - now)
    : 0;

  return {
    isLocked: lockoutRemaining > 0,
    suspiciousActivity: securityState.suspiciousActivityDetected,
    failedAttempts: securityState.failedAttempts,
    lockoutRemaining
  };
}

/**
 * Reset security state (for testing or admin)
 */
export function resetSecurityState(): void {
  securityState = {
    transactionHistory: [],
    lastTransactionTime: 0,
    failedAttempts: 0,
    lockoutUntil: null,
    suspiciousActivityDetected: false
  };
}

/**
 * Validate transaction request with all security checks
 */
export function validateTransactionRequest(request: {
  amount: number;
  merchantId: string;
  userId?: string;
}): {
  valid: boolean;
  error?: string;
  requiresConfirmation?: boolean;
  suspicious?: boolean;
} {
  // Sanitize and validate merchant ID
  const merchantValidation = validateMerchantId(request.merchantId);
  if (!merchantValidation.valid) {
    return { valid: false, error: merchantValidation.error };
  }

  // Validate amount
  const amountValidation = validateAmount(request.amount);
  if (!amountValidation.valid) {
    return { valid: false, error: amountValidation.error };
  }

  // Check rate limits
  const rateLimitCheck = checkRateLimit();
  if (!rateLimitCheck.allowed) {
    return { valid: false, error: rateLimitCheck.error };
  }

  // Check for suspicious activity
  const now = new Date();
  const suspiciousCheck = detectSuspiciousActivity({
    amount: request.amount,
    frequency: securityState.transactionHistory.filter(
      t => t > Date.now() - 3600000
    ).length,
    timeOfDay: now.getHours()
  });

  if (suspiciousCheck.suspicious) {
    logSecurityEvent({
      action: 'SUSPICIOUS_TRANSACTION',
      userId: request.userId,
      details: {
        amount: request.amount,
        merchantId: request.merchantId,
        reason: suspiciousCheck.reason
      }
    });
  }

  // Check if additional confirmation is needed
  const needsConfirmation = requiresAdditionalConfirmation(request.amount);

  return {
    valid: true,
    requiresConfirmation: needsConfirmation,
    suspicious: suspiciousCheck.suspicious
  };
}
