import Confetti from "./confetti-loader";

export default function Home() {
  return (
    <main className="construction-page">
      <Confetti />
      <section className="construction-card" aria-labelledby="page-title">
        <p className="eyebrow">Uma novidade está sendo construída</p>
        <h1 id="page-title">Em Construção</h1>
        <p className="message">
          Estamos nesse exato momento reconstruindo o TabNews, um lugar na
          internet para quem trabalha com tecnologia e precisa consumir
          conteúdos com valor concreto
        </p>
        <p className="content-count" aria-live="polite">
          <strong>1M+</strong> conteúdos publicados no TabNews
        </p>
        <a
          className="official-link"
          href="https://www.tabnews.com.br/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visite o TabNews
          <span aria-hidden="true"> ↗</span>
        </a>
      </section>
    </main>
  );
}
