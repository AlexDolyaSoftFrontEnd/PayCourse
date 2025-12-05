// ============================================
// Импорты зависимостей
// ============================================
import clsx from "clsx"; // Утилита для условного объединения CSS классов
import { useState } from "react"; // Хук для управления состоянием компонента
import styles from "./PayCourse.module.css"; // Импорт CSS модулей с стилями компонента

// ============================================
// Компонент PayCourse - главный компонент формы оплаты курса
// ============================================
const PayCourse = () => {
  // ---- Состояния компонента ----
  
  // Объект для отслеживания состояния чекбоксов (условия согласия пользователя)
  // - war: согласие с позицией относительно войны в Украине
  // - offer: согласие с условиями оферты
  // - personal: согласие на обработку персональных данных
  const [checked, setChecked] = useState({
    war: false,
    offer: false,
    personal: false,
  })

  // Состояние для управления видимостью модального окна оплаты
  const [modalOpen, setModalOpen] = useState(false)
  
  // Состояние для хранения сообщения об успешной оплате (отображается в виде toast-уведомления)
  const [successMessage, setSuccessMessage] = useState("")

  // ---- Вычисляемые значения ----
  
  // Проверка: все ли условия согласия отмечены (нужно для активации кнопки оплаты)
  // Возвращает true только если ВСЕ значения в объекте checked равны true
  const allApproved = Object.values(checked).every(Boolean)

  // ---- Данные с условиями согласия ----
  // Массив объектов, где каждый объект содержит:
  // - id: уникальный идентификатор для связи с состоянием checked
  // - label: текст условия с возможными ссылками на документы
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

  // ============================================
  // Функции-обработчики событий
  // ============================================

  // Функция для переключения состояния конкретного чекбокса
  // Параметр id - идентификатор условия (war, offer или personal)
  // Использует функциональное обновление состояния для избежания race conditions
  const toggle = (id) => {
    setChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Функция для открытия модального окна оплаты
  // Работает только если все условия согласия отмечены (allApproved === true)
  const openModal = () => {
    if (allApproved) setModalOpen(true)
  }

  // Функция для закрытия модального окна
  const closeModal = () => setModalOpen(false)

  // Обработчик отправки формы оплаты
  // Параметр e - объект события формы
  // Процесс:
  // 1. Отменяет стандартное поведение формы (перезагрузку страницы)
  // 2. Закрывает модальное окно
  // 3. Показывает сообщение об успехе
  // 4. Через 3.5 сек удаляет сообщение об успехе
  const handleSubmitPayment = (e) => {
    e.preventDefault()

    setModalOpen(false)
    setSuccessMessage("Дякую за підтримку!")

    setTimeout(() => {
      setSuccessMessage("")
    }, 3500)
  }

  // Функция для закрытия toast-уведомления об успехе (по клику на крестик)
  const closeToast = () => setSuccessMessage("")

  // ============================================
  // Render - возвращение JSX структуры компонента
  // ============================================
  return (
    <section className={styles["pay-course"]}>
      <div className={styles["pay-course__container"]}>
        
        {/* ========== ЗАГОЛОВОК СТРАНИЦЫ ========== */}
        <header className={styles["pay-course__header"]}>
          <h2 className={styles["pay-course__title"]}>Сплатити курс</h2>
        </header>

        {/* ========== ОПИСАНИЕ ========== */}
        {/* Информационная карточка с описанием возможности оплаты */}
        <article className={styles["pay-course__card"]}>
          <p className={styles["pay-course__text"]}>Ви можете сплатити як усю вартість, так і частинами.</p>
        </article>

        {/* ========== ЧЕКБОКСЫ УСЛОВИЙ ========== */}
        {/* Список с чекбоксами для согласия пользователя */}
        {/* Использует map для рендеринга каждого условия из массива terms */}
        <ul className={styles["pay-course__checks"]}>
          {terms.map((term) => (
            <li key={term.id} className={styles["pay-course__check-item"]}>
              <label className={styles["pay-course__check"]}>
                {/* Скрытый input типа checkbox для хранения состояния */}
                <input
                  type="checkbox"
                  className={styles["pay-course__input"]}
                  checked={checked[term.id]}
                  onChange={() => toggle(term.id)}
                />
                {/* Визуальное представление чекбокса (квадрат) */}
                <span className={styles["pay-course__box"]}></span>
                {/* Текст условия */}
                <span className={styles["pay-course__label"]}>{term.label}</span>
              </label>
            </li>
          ))}
        </ul>

        {/* ========== КНОПКА ОПЛАТЫ ========== */}
        {/* Кнопка активируется только когда все условия согласия отмечены */}
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

      {/* ========== TOAST УВЕДОМЛЕНИЕ ОБ УСПЕХЕ ========== */}
      {/* Условный рендеринг: появляется только если есть successMessage */}
      {/* Отображается в правом нижнем углу и автоматически закрывается через 3.5 сек */}
      {successMessage && (
        <div className={styles["pay-course__toast"]}>
          {/* Иконка галочки - символ успеха */}
          <span className={styles["pay-course__toast-icon"]}>✔</span>
          {/* Текст сообщения об успехе */}
          <span className={styles["pay-course__toast-text"]}>{successMessage}</span>

          {/* Кнопка закрытия toast-уведомления */}
          <button
            className={styles["pay-course__toast-close"]}
            onClick={closeToast}
            aria-label="Закрити"
          >
            ×
          </button>
        </div>
      )}

      {/* ========== МОДАЛЬНОЕ ОКНО ОПЛАТЫ ========== */}
      {/* Условный рендеринг: появляется только если modalOpen === true */}
      {/* Используется для ввода данных платежной карты и подтверждения оплаты */}
      {modalOpen && (
        <div className={styles["modal"]}>
          {/* Полупрозрачный оверлей фона, закрывает модал при клике */}
          <div className={styles["modal__overlay"]} onClick={closeModal}></div>

          {/* Основное окно модала */}
          <div className={styles["modal__window"]}>
            {/* Кнопка закрытия модала (крестик в верхнем правом углу) */}
            <button className={styles["modal__close-icon"]} onClick={closeModal}>×</button>

            {/* Заголовок модального окна */}
            <h3 className={styles["modal__title"]}>Оплата курсу</h3>

            {/* Форма для ввода данных оплаты */}
            {/* onSubmit вызывает handleSubmitPayment, который обрабатывает отправку */}
            <form className={styles["modal__form"]} onSubmit={handleSubmitPayment}>

              {/* ПОЛЕ: СУММА ОПЛАТЫ В ГРИВНЯХ */}
              {/* Позволяет пользователю выбрать сумму оплаты */}
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

              {/* ПОЛЕ: ИМЯ ПОЛЬЗОВАТЕЛЯ */}
              <label className={styles["modal__field"]}>
                <span className={styles["modal__label"]}>Ваше ім'я</span>
                <input className={styles["modal__input"]} required />
              </label>

              {/* ПОЛЕ: EMAIL АДРЕС */}
              <label className={styles["modal__field"]}>
                <span className={styles["modal__label"]}>Email</span>
                <input type="email" className={styles["modal__input"]} required />
              </label>

              {/* ПОЛЕ: НОМЕР ПЛАТЕЖНОЙ КАРТЫ */}
              <label className={styles["modal__field"]}>
                <span className={styles["modal__label"]}>Номер картки</span>
                <input className={styles["modal__input"]} required />
              </label>

              {/* ПОЛЯ В ОДНОЙ СТРОКЕ: ДАТА ИСТЕЧЕНИЯ И CVC КОД */}
              <div className={styles["modal__row"]}>
                {/* ПОЛЕ: ДАТА ИСТЕЧЕНИЯ КАРТЫ (месяц/год) */}
                <label className={styles["modal__field"]}>
                  <span className={styles["modal__label"]}>MM/YY</span>
                  <input className={styles["modal__input"]} required />
                </label>

                {/* ПОЛЕ: CVC КОД БЕЗОПАСНОСТИ НА ОБРАТНОЙ СТОРОНЕ КАРТЫ */}
                <label className={styles["modal__field"]}>
                  <span className={styles["modal__label"]}>CVC</span>
                  <input className={styles["modal__input"]} required />
                </label>
              </div>

              {/* КНОПКИ ДЕЙСТВИЯ В МОДАЛЕ */}
              <div className={styles["modal__actions"]}>
                {/* Кнопка отправки формы и подтверждения оплаты */}
                <button type="submit" className={clsx(styles["modal__button"], styles["modal__button--primary"])}>
                  Підтвердити оплату
                </button>

                {/* Кнопка отмены (закрытия модала без сохранения) */}
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


