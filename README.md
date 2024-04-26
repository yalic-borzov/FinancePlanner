# FinancePlanner

## Сервис учета расходов

FinancePlanner — это сервис для учета расходов, предназначенный для помощи пользователем в планировании и
оптимизации их финансов. Этот инструмент позволяет не только отслеживать каждую трату, но и анализировать финансовые
потоки с целью улучшения финансового состояния. Используя FinancePlanner, пользователи могут устанавливать бюджеты,
прогнозировать расходы и находить способы сокращения ненужных расходов. Этот сервис является необходимым инструментом
для тех, кто стремится к более осознанному и эффективному управлению своими средствами, обеспечивая тем самым финансовую
стабильность и возможность достижения долгосрочных целей.

## [Презентация](https://docs.google.com/presentation/d/1EhVGpa5LwlQ0MZ5haffGN86hd5-i6OtKBtJ5wzmMuh0/edit?usp=sharing)

## Как запустить?

Сервис можно опробовать на сайте: https://planner.projectblack.ru

## Как запустить локально?

Для этого нужен PostgresSQL, Node.js, Python(3.12)

1. Установите зависимости

~~~
pip install -r requirements.txt
~~~

2. Зайдите в папку app и переименуйте файл .env.example в .env
3. Заполните файл .env

~~~
Пример:
DATABASE_STRING=postgresql+asyncpg://planner:mysecretpassword@localhost:5432/plannerdb
ALEMBIC_DATABASE_STRING=postgresql://planner:mysecretpassword@localhost:5432/plannerdb
JWT_SECRET=I8nsWvkZqS2DH6Z7aYHXPuO09ubl1icKNgZfiL2oRnVT6pzugej3NBwpuO7T1om6Whr6HlSU0qHx9GE9XRiDKvwHx35nkLR3++HIOgXv78vYliPd85AEd52AcoN0u4xxtt9YuQpiKPmJ5bX+e3hy0oKzS3Pg8AikDCbSB5Dq6WSBO3jwWHadxSBP/Q7eyz7uWC+Nl8YZaNeoaQ50eDuYe8G9M7UudGdoaitxSNFslwG4AutWmxsTrPQEtRADWwXb1Iz4yCw3NOCo6CGw5A++GExzjKSLutOWnzbffelqWnvLTzU+OwkRmHqw==
DEBUG=False
~~~

Важно! DATABASE_STRING - должен быть только PostgresSQL а также AsyncPG

ALEMBIC_DATABASE_STRING - должен быть просто Postgresql
(без AsyncPG)

JWT_SECRET - Рандомный сгенерированный пароль

4. Перейдите обратно в папку FinancePlanner и выполните команды

~~~
alembic upgrade head
python -m app
~~~

5. Откройте терминал в новой вкладке, перейдите в каталог Frontend
6. Запустите команды

~~~
npm i
npm run dev
~~~

После этих действий у вас запуститься Frontend вместе с Backend'ом