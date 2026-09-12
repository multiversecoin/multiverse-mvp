import asyncio, json, subprocess, os
import edge_tts

BASE = os.path.dirname(os.path.abspath(__file__))

VOICE = "pt-BR-AntonioNeural"
OUT = BASE + "/audio"
os.makedirs(OUT, exist_ok=True)

SEGMENTS = [
    ("s1", "São Paulo tem mais de doze milhões de habitantes, mas a economia local está fragmentada. "
           "O dinheiro que circula nos bairros não fica na comunidade: pequenos comerciantes perdem para grandes redes, "
           "e os moradores não veem o impacto real do seu consumo."),
    ("s2", "Esta é a Multiverse: uma plataforma de economia digital territorial. "
           "O primeiro território experimental é Moema, em São Paulo. "
           "O aplicativo conecta pessoas, comércio local, inteligência, impacto e segurança "
           "numa experiência mobile, simples e poderosa."),
    ("s3", "Veja como funciona. O morador abre o Multiverse e vê seu território, seu saldo em Multiverse Coin e o impacto gerado. "
           "Explora o comércio local, escolhe um estabelecimento, confirma uma oferta e recebe cashback na hora. "
           "Cada transação gera impacto automático: cinquenta e um por cento vai para projetos locais de alimentação, "
           "educação, infância, idosos e empregabilidade."),
    ("s4", "O que torna a Multiverse inovadora? Guardrails de segurança que protegem contra ataques e prompts maliciosos. "
           "Arquitetura preparada para integração futura com blockchain, garantindo rastreabilidade. "
           "E segurança territorial, com mapa de áreas de atenção e pontos de apoio comunitário."),
    ("s5", "Não é apenas tecnologia: é impacto humano. No modelo demonstrativo, doze mil quatrocentos e cinquenta reais "
           "gerados em Moema e dezessete famílias impactadas. "
           "Moema é só o começo: a visão é expandir para outros bairros de São Paulo e depois para outras cidades brasileiras."),
    ("s6", "Multiverse: transformando consumo local em impacto social. "
           "O código está aberto no GitHub. Explore, teste e junte-se a nós. Obrigado!"),
]


async def main():
    meta = {}
    for name, text in SEGMENTS:
        path = f"{OUT}/{name}.mp3"
        await edge_tts.Communicate(text, VOICE, rate="+8%").save(path)
        dur = float(subprocess.check_output([
            "ffprobe", "-v", "error", "-show_entries", "format=duration",
            "-of", "default=nw=1:nk=1", path]).strip())
        meta[name] = dur
        print(name, round(dur, 2))
    print("total", round(sum(meta.values()), 2))
    json.dump(meta, open(BASE + "/durations.json", "w"), indent=2)

asyncio.run(main())
