const API_KEY = "cee74db3c17638132c0bf4a8cf1bf0c6";

// 날씨 DOM
const city = document.getElementById("city");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const weatherContainer = document.querySelector("#weather-container");
const weatherImage = document.querySelector("#weather-container img");

// 현재 위치
navigator.geolocation.getCurrentPosition((position) => {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log(lat, lon);
  getWeather(lat, lon);
});

// 날씨 api
const getWeather = async (lat, lon) => {
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  let response = await fetch(url);
  let data = await response.json();
  console.log(data);
  weatherRender(data);
};

const weatherRender = (data) => {
  city.innerText = data.name;
  temp.innerText = data.main.temp;
  description.innerText = data.weather[0].description;

  const weatherIcon = data.weather[0].icon;
  weatherImage.src = `https://openweathermap.org/img/wn/${weatherIcon}.png`;
};

// todo DOM
const todoButton = document.getElementById("todo-button");
const todoInput = document.getElementById("todo-input");
const todoList = [];

const addTask = () => {
  const task = {
    id: randomIDGenerate(),
    todoContent: todoInput.value,
    isComplete: false,
    isEditing: false,
  };
  todoList.push(task);
  todoInput.value = "";
  todoRender();
};

todoButton.addEventListener("click", addTask);

const todoRender = () => {
  let resultHTML = "";

  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].isEditing) {
      resultHTML += ` <div class="list">
          <input type="text" value="${todoList[i].todoContent}" id="edit-${todoList[i].id}" />
          <button onclick="saveTask('${todoList[i].id}')">완료</button>
          <button onclick="cancelEdit('${todoList[i].id}')">취소</button>
        </div>`;
    } else {
      resultHTML += `<div class="list">
            <p>${todoList[i].todoContent}</p>
            <button onclick="editTask('${todoList[i].id}')">수정</button>
            <button onclick="todoDelete('${todoList[i].id}')">삭제</button>
          </div>`;
    }
  }

  document.getElementById("tesk-board").innerHTML = resultHTML;
};

const randomIDGenerate = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

// 수정
const editTask = (id) => {
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id === id) {
      todoList[i].isEditing = true;
      break;
    }
  }
  todoRender();
};

// 수정된걸 저장
const saveTask = (id) => {
  const editValue = document.getElementById(`edit-${id}`).value;
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id === id) {
      todoList[i].todoContent = editValue;
      todoList[i].isEditing = false;
      break;
    }
  }
  todoRender();
};

// 수정취소
const cancelEdit = (id) => {
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id === id) {
      todoList[i].isEditing = false;
      break;
    }
  }
  todoRender();
};

// 삭제
const todoDelete = (id) => {
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].id === id) {
      todoList.splice(i, 1);
      break;
    }
  }
  todoRender();
};

// 달력 렌더링 함수
const renderCalendar = (month, year) => {
  const calendarContainer = document.getElementById("calendar-container");

  // 한 달의 첫 날의 요일 (0: Sunday, 1: Monday, ..., 6: Saturday)
  const firstDay = new Date(year, month, 1).getDay();

  // 해당 월의 마지막 날짜
  const lastDate = new Date(year, month + 1, 0).getDate();

  // 현재 날짜
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // 달력 헤더 (일, 월, 화, 수, 목, 금, 토)
  const header = ["일", "월", "화", "수", "목", "금", "토"];

  // 년도와 월 표시
  let calendarHTML = `<div class="year-month">${year}년 ${month + 1}월</div>`;

  // 헤더 추가 (요일을 한 줄로 배치)
  calendarHTML += `<div class="header">${header.map(day => `<div class="day">${day}</div>`).join('')}</div>`;

  // 빈 날짜들 추가 (첫 주의 앞부분)
  for (let i = 0; i < firstDay; i++) {
    calendarHTML += "<div class='day empty'></div>"; // 빈 칸
  }

  // 날짜 추가
  for (let date = 1; date <= lastDate; date++) {
    let dayClass = "day";
    if (date === currentDay && month === currentMonth && year === currentYear) {
      dayClass += " today"; // 오늘 날짜 강조
    }
    calendarHTML += `<div class='${dayClass}'>${date}</div>`;
  }

  // 달력 내용 삽입
  calendarContainer.innerHTML = calendarHTML;
};

// 현재 날짜로 달력 렌더링
const currentDate = new Date();
const currentMonth = currentDate.getMonth(); // 0: 1월, 1: 2월, ...
const currentYear = currentDate.getFullYear();

renderCalendar(currentMonth, currentYear);