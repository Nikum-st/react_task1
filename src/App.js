import style from './App.module.css';
import { useState } from 'react';
import moment from 'moment';

const date = moment().format('DD.MM.YYYY HH:mm:ss');

export default function App() {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');
	const [id, setId] = useState(0);

	const isValueVaild = value ? true : false;
	const isListValid = list.length === 0 ? false : true;

	const onInputButtonClick = () => {
		let promptValue = prompt();
		if (promptValue.length >= 3) {
			setValue(promptValue);
			setError('');
		} else setError('Введенное значение должно содержать минимум 3 символа');
	};

	const onAddButtonClick = () => {
		if (value) {
			setId((prevId) => prevId + 1);
			setList((prevList) => [...prevList, { id, value }]);
			setError('');
			setValue('');
		}
	};

	const textMargin = !isListValid ? (
		<p className={style['no-margin-text']}>Нет добавленных элементов</p>
	) : (
		<p className={style['no-margin-text']} style={{ visibility: 'hidden' }}>
			Нет добавленных элементов
		</p>
	);

	return (
		<div className={style['app']}>
			<h1 className={style['pageHeading']}>Ввод значения</h1>
			<p className={style['no-margin-text']}>
				Текущее значение <code>value</code>: "
				<output className={style['current-value']}>{value}</output>"
			</p>
			<div className={style['error']}>{error}</div>
			<div className={style['buttons-container']}>
				<button className={style['button']} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={style['button']}
					disabled={!isValueVaild}
					onClick={onAddButtonClick}
				>
					Добавить в список
				</button>
			</div>
			<div className={style['list-container']}>
				<h2 className={style['list-heading']}>Список:</h2>
				{textMargin}
				<ul className={style['list']}>
					{list.map((item) => (
						<li className={style['list-item']} key={item.id}>
							{item.value}
							{`  Было добавлено: ${date}`}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
