import clsx from "clsx"
import { useState } from "react"
import styles from "./PayCourse.module.css"

const PayCourse = () => {
  const [checked, setChecked] = useState({
    war: false,
    offer: false,
    personal: false,
  })

  const [modalOpen, setModalOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const allApproved = Object.values(checked).every(Boolean)

  const terms = [
    {
      id: "war",
      label: <>Я не підтримую напад на Україну.</>,
    },
    {
      id: "offer",
      label: (
        <>
          Я погоджуюсь з умовами{" "}
          <a href="#offer" className={styles["pay-course__link"]}>оферти</a>.
        </>
      ),
    },
    {
      id: "personal",
      label: (
        <>
          Я даю згоду на обробку персональних даних згідно з{" "}
          <a href="#privacy" className={styles["pay-course__link"]}>умовами</a>.
        </>
      ),
    },
  ]

  const toggle = (id) => {
    setChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const openModal = () => {
    if (allApproved) setModalOpen(true)
  }

  const closeModal = () => setModalOpen(false)

  const handleSubmitPayment = (e) => {
    e.preventDefault()

    setModalOpen(false)
    setSuccessMessage("Дякую за підтримку!")

    setTimeout(() => {
      setSuccessMessage("")
    }, 3500)
  }

  const closeToast = () => setSuccessMessage("")

  return (
    <section className={styles["pay-course"]}>
      <div className={styles["pay-course__container"]}>
        
        <header className={styles["pay-course__header"]}>
          <h2 className={styles["pay-course__title"]}>Сплатити курс</h2>
        </header>

        <article className={styles["pay-course__card"]}>
          <p className={styles["pay-course__text"]}>Ви можете сплатити як усю вартість, так і частинами.</p>
        </article>

        <ul className={styles["pay-course__checks"]}>
          {terms.map((term) => (
            <li key={term.id} className={styles["pay-course__check-item"]}>
              <label className={styles["pay-course__check"]}>
                <input
                  type="checkbox"
                  className={styles["pay-course__input"]}
                  checked={checked[term.id]}
                  onChange={() => toggle(term.id)}
                />
                <span className={styles["pay-course__box"]}></span>
                <span className={styles["pay-course__label"]}>{term.label}</span>
              </label>
            </li>
          ))}
        </ul>

        <div className={styles["pay-course__cta"]}>
          <button
            type="button"
            disabled={!allApproved}
            onClick={openModal}
            className={clsx(
              styles["pay-course__button"],
              !allApproved && styles["pay-course__button--disabled"]
            )}
          >
            Оплатити курс
          </button>
        </div>
      </div>

      {/* ---------- TOAST ---------- */}
      {successMessage && (
        <div className={styles["pay-course__toast"]}>
          <span className={styles["pay-course__toast-icon"]}>✔</span>
          <span className={styles["pay-course__toast-text"]}>{successMessage}</span>

          <button
            className={styles["pay-course__toast-close"]}
            onClick={closeToast}
            aria-label="Закрити"
          >
            ×
          </button>
        </div>
      )}

      {/* ---------- MODAL ---------- */}
      {modalOpen && (
        <div className={styles["modal"]}>
          <div className={styles["modal__overlay"]} onClick={closeModal}></div>

          <div className={styles["modal__window"]}>
            <button className={styles["modal__close-icon"]} onClick={closeModal}>×</button>

            <h3 className={styles["modal__title"]}>Оплата курсу</h3>

            <form className={styles["modal__form"]} onSubmit={handleSubmitPayment}>

              {/* НОВЕ ПОЛЕ — СУМА ОПЛАТИ */}
              <label className={styles["modal__field"]}>
                <span className={styles["modal__label"]}>Сума оплати (грн)</span>
                <input
                  type="number"
                  min="1"
                  inputMode="numeric"
                  className={styles["modal__input"]}
                  required
                />
              </label>

              {/* Імʼя */}
              <label className={styles["modal__field"]}>
                <span className={styles["modal__label"]}>Ваше ім’я</span>
                <input className={styles["modal__input"]} required />
              </label>

              {/* Email */}
              <label className={styles["modal__field"]}>
                <span className={styles["modal__label"]}>Email</span>
                <input type="email" className={styles["modal__input"]} required />
              </label>

              {/* Номер картки */}
              <label className={styles["modal__field"]}>
                <span className={styles["modal__label"]}>Номер картки</span>
                <input className={styles["modal__input"]} required />
              </label>

              <div className={styles["modal__row"]}>
                <label className={styles["modal__field"]}>
                  <span className={styles["modal__label"]}>MM/YY</span>
                  <input className={styles["modal__input"]} required />
                </label>

                <label className={styles["modal__field"]}>
                  <span className={styles["modal__label"]}>CVC</span>
                  <input className={styles["modal__input"]} required />
                </label>
              </div>

              <div className={styles["modal__actions"]}>
                <button type="submit" className={clsx(styles["modal__button"], styles["modal__button--primary"])}>
                  Підтвердити оплату
                </button>

                <button
                  type="button"
                  className={clsx(styles["modal__button"], styles["modal__button--secondary"])}
                  onClick={closeModal}
                >
                  Скасувати
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </section>
  )
}

export default PayCourse


