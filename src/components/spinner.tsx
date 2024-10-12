import styles from './spinner.module.css'

export const Spinner = () => {
  return (
    <div
      className={styles['lds-roller']}
      style={{
        transform: 'scale(0.6)',
      }}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
