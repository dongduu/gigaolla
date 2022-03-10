import styled from "styled-components";
import DatePicker from "react-datepicker";
import reset from "../image/reset.svg";
import calendar from "../image/calendar.svg";

const ChartTab = ({
  onClick,
  view,
  todayDate,
  setTodayDate,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const Tab = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 11px;
    button {
      cursor: pointer;
      padding: 10px 20px;
      margin-left: 10px;
      background: #f4f4f4;
      border-radius: 8px;
      border: none;
      &.active {
        background: #5d5fef;
        color: #fff;
      }
    }
    .reset {
      margin-right: 15px;
      margin-left: 0;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .calendarcontainer {
      position: relative;
      min-width: 165px;
      max-width: 215px;
      .datepicker-wrap {
        display: flex;
        background: #f4f4f4;
        padding: 11px 15px 10px 48px;
        box-sizing: border-box;
        border-radius: 8px;
        .datepicker {
          cursor: pointer;
          background: #f4f4f4;
          border: none;
          font-size: 14px;
          line-height: 19px;
          text-align: center;
          width: 75px;
          padding: 0;
          &:focus {
            outline: none;
          }
        }
      }
      img {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 17px;
        z-index: 1;
      }
    }
  `;
  return (
    <Tab>
      <button className="reset" onClick={() => onClick("bar")}>
        <img src={reset} alt="reset" />
      </button>
      <div className="calendarcontainer">
        <img src={calendar} alt="calendar" className="navicon" />
        <div className="datepicker-wrap">
          {view === "bar" ? (
            <DatePicker
              className="datepicker"
              selected={todayDate}
              dateFormat="yyyy/MM/dd"
              disabled
            />
          ) : (
            <>
              <DatePicker
                className="datepicker"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                maxDate={new Date()}
                dateFormat="yyyy/MM"
                showMonthYearPicker
              />
              ,
              <DatePicker
                className="datepicker"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                maxDate={new Date()}
                dateFormat="yyyy/MM"
                showMonthYearPicker
              />
            </>
          )}
        </div>
      </div>
      {/* 원하시는 함수 props 로 내려서 쓰시면 됩니다. */}
      <button onClick={() => onClick("compareBar")}>비교</button>
      <button onClick={() => onClick("chart")}>추이</button>
    </Tab>
  );
};

export default ChartTab;
