import json, os, shutil
from playwright.sync_api import sync_playwright

BASE = os.path.dirname(os.path.abspath(__file__))

D = json.load(open(BASE + "/durations.json"))
OUT = BASE + "/rec"
shutil.rmtree(OUT, ignore_errors=True)
os.makedirs(OUT, exist_ok=True)

PAD_START, GAP, PAD_END = 0.8, 1.2, 2.0
TIMELINE = []  # (label, seconds) for audio building


def seg(pg, name, steps):
    """steps: list of (callable|None, seconds). Total must equal narration duration."""
    total = sum(s for _, s in steps)
    target = D[name]
    assert abs(total - target) < 0.35, (name, total, target)
    for fn, secs in steps:
        if fn:
            fn()
        pg.wait_for_timeout(int(secs * 1000))


with sync_playwright() as p:
    b = p.chromium.launch(args=["--force-device-scale-factor=1"])
    ctx = b.new_context(
        viewport={"width": 1920, "height": 1080},
        record_video_dir=OUT,
        record_video_size={"width": 1920, "height": 1080},
    )
    pg = ctx.new_page()
    pg.goto("http://localhost:8000/stage.html", wait_until="load")
    pg.wait_for_timeout(4000)  # fonts + iframe app boot (not part of timeline)

    js = pg.evaluate
    pg.wait_for_timeout(int(PAD_START * 1000))

    # ---- 1. Problema
    js("showHero(true)")
    seg(pg, "s1", [
        (None, 5.0),
        (lambda: js("showHero(false)") or js("""setSlide({
            kicker: 'O problema',
            title: 'A economia local<br/>está fragmentada',
            bullets: [
              '12 milhões de habitantes em São Paulo',
              'O dinheiro não fica no bairro',
              'Comércio local perde para grandes redes',
              'O morador não vê o impacto do seu consumo'
            ]})"""), 10.2),
    ])
    pg.wait_for_timeout(int(GAP * 1000))

    # ---- 2. A solução
    js("""setSlide({
        kicker: 'A solução',
        title: 'Multiverse',
        sub: 'Plataforma de economia digital territorial — primeiro território: <b>Moema, São Paulo</b>',
        bullets: ['Pessoas + comércio local', 'Inteligência + impacto + segurança', 'Experiência mobile-first']})""")
    js("showPhone(true)")
    seg(pg, "s2", [
        (None, 7.0),
        (lambda: js("appScroll(420)"), 5.0),
        (lambda: js("appScroll(0)"), 4.8),
    ])
    pg.wait_for_timeout(int(GAP * 1000))

    # ---- 3. Demonstração
    js("""setSlide({
        kicker: 'Como funciona',
        title: 'Uma transação,<br/>impacto imediato',
        bullets: ['Saldo em MCC e território na Home', 'Explora o comércio local', 'Compra com cashback na hora',
                  '<b>51%</b> vai para projetos locais']})""")
    seg(pg, "s3", [
        (None, 5.0),
        (lambda: js("appCall('navigate', ['explore'])"), 4.0),
        (lambda: js("appScroll(350)"), 2.5),
        (lambda: js("appCall('selectMerchant', ['1'])") or js("appScroll(0, false)"), 4.5),
        (lambda: js("appScroll(500)"), 3.0),
        (lambda: js("appCall('makeTransaction', ['1', 42, 5])"), 4.7),
    ])
    pg.wait_for_timeout(int(GAP * 1000))

    # ---- 4. Inovação e segurança
    js("""setSlide({
        kicker: 'Inovação',
        title: 'Segura por design',
        bullets: ['Guardrails contra prompts maliciosos', 'Rate limiting, validação e auditoria',
                  'Arquitetura pronta para blockchain', 'Segurança territorial e pontos de apoio']})""")
    js("appCall('navigate', ['impact'])")
    js("appScroll(0, false)")
    seg(pg, "s4", [
        (None, 5.0),
        (lambda: js("appScroll(500)"), 4.0),
        (lambda: js("appCall('navigate', ['safety'])") or js("appScroll(0, false)"), 5.0),
        (lambda: js("appScroll(520)"), 4.4),
    ])
    pg.wait_for_timeout(int(GAP * 1000))

    # ---- 5. Impacto e visão
    js("""setSlide({
        kicker: 'Impacto e visão',
        title: 'Não é só tecnologia,<br/>é impacto humano',
        stats: [{v: 'R$ 12.450', l: 'gerados em Moema'}, {v: '17', l: 'famílias impactadas'},
                {v: '51%', l: 'de cada transação'}],
        sub: 'Moema é só o começo — próximos bairros de São Paulo e outras cidades'})""")
    js("appCall('navigate', ['wallet'])")
    js("appScroll(0, false)")
    seg(pg, "s5", [
        (None, 6.0),
        (lambda: js("appScroll(450)"), 5.0),
        (lambda: js("appScroll(900)"), 6.6),
    ])
    pg.wait_for_timeout(int(GAP * 1000))

    # ---- 6. CTA
    js("showPhone(false)")
    js("showHero(true, 'github.com/multiversecoin/multiverse-mvp')")
    seg(pg, "s6", [(None, D["s6"])])
    pg.wait_for_timeout(int(PAD_END * 1000))

    path = pg.video.path()
    ctx.close()
    b.close()
    expected = PAD_START + PAD_END + 5 * GAP + sum(D.values())
    print("video:", path)
    print("expected_duration:", round(expected, 2))
    json.dump({"expected": expected, "video": path},
              open(BASE + "/rec_meta.json", "w"))
