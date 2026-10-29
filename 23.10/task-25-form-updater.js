/**
 * Задача 25: Универсальный обработчик формы с вычисляемыми ключами
 * Computed Property Names ([name]: value)
 */

function updateFormState(prevState, fieldName, fieldValue) {
  return {
    ...prevState,
    // Вычисляемое имя свойства
    [fieldName]: fieldValue,
  };
}

// Примеры использования:
/*
const formState = {
  username: 'alice',
  email: 'alice@example.com',
  password: '',
  newsletter: false,
};

// Обновляем email
const state1 = updateFormState(formState, 'email', 'alice@newdomain.com');
// {
//   username: 'alice',
//   email: 'alice@newdomain.com',
//   password: '',
//   newsletter: false,
// }

// Добавляем новое поле
const state2 = updateFormState(formState, 'bio', 'Software developer');
// {
//   username: 'alice',
//   email: 'alice@example.com',
,
//   password: '',
//   newsletter: false,
//   bio: 'Software developer',
// }

// Комплексный пример с обработчиком input
function createFormHandlers(initialState) {
  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setForm((prev) => updateFormState(prev, name, type === 'checkbox' ? checked : value));
  };

  return { form, handleChange };
}

// Использование:
/*
const { form, handleChange } = createFormHandlers({
  firstName: '',
  lastName: '',
  email: '',
});

// В JSX:
<input 
  name="firstName" 
  value={form.firstName} 
  onChange={handleChange} 
/>
<input 
  name="lastName" 
  value={form.lastName} 
  onChange={handleChange} 
/>
<input 
  name="email" 
  type="email"
  value={form.email} 
  onChange={handleChange} 
/>
*/