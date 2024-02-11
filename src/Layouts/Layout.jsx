import styles from './Layout.module.css'

function Layout({children}) {
   return (
      <>
      <header className={styles.header}>
         <h2>Crypto currency</h2>
         <p>
            <a href="https://github.com/thenoroozi">🔗Thenoroozi</a>
         </p>
      </header>
      {children}
      <footer className={styles.footer}>
         <p>Developed by <a href="https://github.com/thenoroozi">Hamed Noroozi</a></p>
      </footer>
      </>
   );
}

export default Layout;