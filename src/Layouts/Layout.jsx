import styles from './Layout.module.css'
import coinIcon from '../../public/coin icon.png'
import github from "../../public/github.png"

function Layout({ children }) {
   return (
      <>
         <header className={styles.header}>
            <p>
               <img src={github} alt="" />
               <a href="https://github.com/thenoroozi">Thenoroozi</a>
            </p>
            <div className={styles.title}>
               <h2>Crypto currency</h2>
               <img src={coinIcon} />
            </div>
         </header>
         {children}
         <footer className={styles.footer}>
            <p>Developed by <a href="https://github.com/thenoroozi">Hamed Noroozi</a></p>
         </footer>
      </>
   );
}

export default Layout;