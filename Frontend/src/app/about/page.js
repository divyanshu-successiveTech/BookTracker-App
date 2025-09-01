import styles from './about.module.css';



export default function AboutPage() {
  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <h1>About BookNest</h1>
        <p>Your cozy corner for every book lover.</p>
      </section>

      <section className={styles.content}>
        <p>
          Welcome to <strong>BookNest</strong> – your digital haven for all things books. Whether you're a fan of timeless classics,
          thrilling mysteries, inspiring non-fiction, or the latest bestsellers, we bring the world of literature right to your fingertips.
        </p>

        <p>
          Founded with a passion for storytelling and technology, BookNest aims to bridge the gap between readers and books
          by offering a seamless, personalized, and delightful book browsing experience.
        </p>

        <p>
          Our mission is simple: <em>to ignite a love for reading in everyone, everywhere.</em> With intuitive features like smart
          recommendations, wishlist tracking, and community reviews, BookNest isn't just an app – it's a reading companion.
        </p>
      </section>

      <section className={styles.team}>
        <h2>Meet the Team</h2>
        <p>
          We’re a team of developers, designers, and bookworms working together to make reading more accessible and enjoyable
          for everyone.
        </p>
      </section>

      <footer className={styles.footer}>
        <p>📚 Made with love for readers, by readers.</p>
      </footer>
    </div>
  );
}
