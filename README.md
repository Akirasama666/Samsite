# SAMAEL · The Black Serpent — Website

Site estático (HTML + CSS + JS puro). Sem build, sem dependências.
Pronto para subir em **Netlify**, **Vercel**, **GitHub Pages** ou qualquer hospedagem.

## Estrutura

```
samael-site/
├── index.html      → todo o conteúdo e as seções do site
├── css/style.css   → todo o visual (cores, tipografia, animações, responsivo)
├── js/main.js      → interações + CONFIGURAÇÃO DE CONTATO (edite aqui)
└── assets/         → coloque aqui suas imagens reais (fotos, cartas, texturas)
```

## ⚙ Como editar WhatsApp, e-mail e redes sociais

Abra **`js/main.js`** — tudo está no bloco `CONFIG` no topo do arquivo:

```js
const CONFIG = {
  whatsapp: "5561993118272",              // 55 + DDD + número (só dígitos)
  whatsappDisplay: "+55 (61) 99311-8272", // como o número aparece no site
  email: "darksage.yy@gmail.com",
  social: {
    Instagram: "",   // cole a URL para exibir; vazio = oculto
    TikTok: "",
    YouTube: ""
  },
  quotes: [ ... ]    // frases da seção oráculo (adicione/remova à vontade)
};
```

Salvou, publicou — todos os botões (hero, cards, CTA, contato e o botão
flutuante) usam esse único bloco. Não é preciso mexer em mais nada.

## ✍ Como editar os textos

Todos os textos estão em **`index.html`**, organizados por seção com
comentários grandes (`═══ 1 · HERO ═══`, `═══ 4 · SERVIÇOS ═══` etc.).
Basta localizar a seção e trocar o texto entre as tags.

Cada card de serviço tem sua própria mensagem pré-preenchida de WhatsApp
no atributo `data-msg` — personalize se quiser.

## 🖼 Onde inserir imagens reais depois

Sugestões (coloque os arquivos em `assets/` e prefira `.webp` comprimido):

1. **Hero** — uma foto/arte de serpente negra real como fundo:
   substitua o SVG dentro de `<div class="hero__serpent">` por
   `<img src="assets/serpente.webp" alt="" loading="lazy">`.
2. **Seção Sobre** — retrato real da persona: substitua o SVG dentro de
   `<div class="about__frame">` por `<img src="assets/retrato.webp" alt="Samael">`.
   (O texto "espaço reservado para retrato real" já marca o lugar.)
3. **Seção Cartas** — fotos das suas cartas reais: substitua os SVGs
   dentro de cada `<div class="tarot__inner">`.
4. **Fundos de seção** — texturas de flores escuras podem entrar como
   `background-image` em `.manifesto__bg` e `.arcana__bg` no CSS.

Sempre use `loading="lazy"` em imagens fora da primeira dobra.

## 🎨 Como mudar cores e fontes

Em `css/style.css`, tudo está nas variáveis do topo (`:root`):
preto, vinho, dourado, marfim, fontes e espaçamentos.

## 🚀 Como publicar

- **Netlify**: arraste a pasta `samael-site` em https://app.netlify.com/drop
- **Vercel**: `vercel deploy` na pasta, ou importe o repositório
- **GitHub Pages**: suba os arquivos e ative Pages na branch principal

## Notas

- Performance: sem bibliotecas externas, animações via CSS, JS < 6 KB.
- As animações são desativadas automaticamente para quem usa
  `prefers-reduced-motion`, e o cursor dourado não roda em telas touch.
- Aviso ético já incluído na seção de serviços.
