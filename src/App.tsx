import React from 'react';
import './App.scss';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);
  return `Clock-${value}`;
}

type State = {
  clockName: string;
  timeNow: Date;
  hasClock: boolean;
  suppressNextLog: boolean;
};

export class App extends React.Component<{}, State> {
  state: State = {
    clockName: 'Clock-0',
    timeNow: new Date(),
    hasClock: true,
    suppressNextLog: false,
  };

  private nameTimerId?: number;
  private timeTimerId?: number;

  private handleRightClick = (event: MouseEvent) => {
    event.preventDefault();
    this.setState({ hasClock: false });
  };

  private handleLeftClick = () => {
    this.setState({ hasClock: true });
  };

  componentDidMount() {
    this.nameTimerId = window.setInterval(() => {
      this.setState({ clockName: getRandomName() });
    }, 3300);

    this.timeTimerId = window.setInterval(() => {
      this.setState({ timeNow: new Date() });
    }, 1000);

    document.addEventListener('contextmenu', this.handleRightClick);
    document.addEventListener('click', this.handleLeftClick);
  }

  componentWillUnmount() {
    if (this.nameTimerId != null) {
      window.clearInterval(this.nameTimerId);
    }

    if (this.timeTimerId != null) {
      window.clearInterval(this.timeTimerId);
    }

    document.removeEventListener('contextmenu', this.handleRightClick);
    document.removeEventListener('click', this.handleLeftClick);
  }

  componentDidUpdate(_prevProps: {}, prevState: State) {
    const { hasClock, suppressNextLog } = this.state;

    if (prevState.timeNow !== this.state.timeNow) {
      if (!suppressNextLog) {
        // eslint-disable-next-line no-console
        console.log(this.state.timeNow.toUTCString().slice(-12, -4));
      } else {
        this.setState({ suppressNextLog: false });
      }
    }

    if (prevState.clockName !== this.state.clockName) {
      // eslint-disable-next-line no-console
      console.warn(`Renamed from ${prevState.clockName} to ${this.state.clockName}`);
    }

    if (prevState.hasClock && !hasClock) {
      if (this.nameTimerId !== undefined) {
        window.clearInterval(this.nameTimerId);
        this.nameTimerId = undefined;
      }
      if (this.timeTimerId !== undefined) {
        window.clearInterval(this.timeTimerId);
        this.timeTimerId = undefined;
      }
    }

    if (!prevState.hasClock && hasClock) {
      this.setState({
        timeNow: new Date(),
        clockName: getRandomName(),
        suppressNextLog: true,
      });

      this.nameTimerId = window.setInterval(() => {
        this.setState({ clockName: getRandomName() });
      }, 3300);

      this.timeTimerId = window.setInterval(() => {
        this.setState({ timeNow: new Date() });
      }, 1000);
    }
  }

  render() {
    const { clockName, timeNow, hasClock } = this.state;

    return (
      <div className="App">
        <h1>React clock</h1>

        {hasClock && (
          <div className="Clock">
            <strong className="Clock__name">{clockName}</strong>
            {' time is '}
            <span className="Clock__time">
              {timeNow.toUTCString().slice(-12, -4)}
            </span>
          </div>
        )}
      </div>
    );
  }
}














// import React from 'react';
// import './App.scss';

// export class App extends React.Component<
//   {},
//   { hasClock: boolean; clockName: string }
// > {
//   state = {
//     hasClock: true, // по умолчанию часы видны
//     clockName: 'Clock-0', // дефолтное имя
//   };

//   render() {
//     const { hasClock, clockName } = this.state;
//     const today = new Date();

//     return (
//       <div className="App">
//         <h1>React clock</h1>
//         {hasClock && (
//           <div className="Clock">
//             <strong className="Clock__name">{clockName}</strong>
//             {' time is '}
//             <span className="Clock__time">
//               {today.toUTCString().slice(-12, -4)}
//             </span>
//           </div>
//         )}
//       </div>
//     );
//   }
// }





// import React from 'react';
// import './App.scss';

// function getRandomName(): string {
//   const value = Date.now().toString().slice(-4);

//   return `Clock-${value}`;
// }

// export const App: React.FC = () => {
//   const today = new Date();
//   let clockName = 'Clock-0';

//   // This code starts a timer
//   const timerId = window.setInterval(() => {
//     clockName = getRandomName();
//   }, 3300);

//   // this code stops the timer
//   window.clearInterval(timerId);

//   return (
//     <div className="App">
//       <h1>React clock</h1>

//       <div className="Clock">
//         <strong className="Clock__name">{clockName}</strong>

//         {' time is '}

//         <span className="Clock__time">
//           {today.toUTCString().slice(-12, -4)}
//         </span>
//       </div>
//     </div>
//   );
// };


// import React, { useEffect, useState } from 'react';
// import './App.scss';

// function getRandomName(): string {
//   const value = Date.now().toString().slice(-4);

//   return `Clock-${value}`;
// }

// export const App: React.FC = () => {
//   const [timeNow, setTimeNow] = useState(new Date());
//   const [clockName, setClockName] = useState('Clock-0');

//   useEffect(() => {
//       const name = setInterval(() => {
//         setClockName(getRandomName());
//       }, 3300);

//       return () => clearInterval(name);
//     }, []);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeNow(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const [visible, setVisible] = useState(true);

//   useEffect(() => {
//     const handleDocumentClick = (e: MouseEvent) => {
//       if (e.button === 0) {
//         console.log('Левая кнопка');
//         setVisible(true);
//       }
//     };

//     const handleContextMenu = (e: MouseEvent) => {
//       e.preventDefault();
//       console.log('Правая кнопка');
//       setVisible(false);
//     };

//     document.addEventListener('click', handleDocumentClick);
//     document.addEventListener('contextmenu', handleContextMenu);

//     return () => {
//       document.removeEventListener('click', handleDocumentClick);
//       document.removeEventListener('contextmenu', handleContextMenu);
//     };
//   }, []);

//   return (
//     <div className="App">
//       <h1>React clock</h1>

//       {visible && (
//         <div className="Clock">
//           <strong className="Clock__name">{clockName}</strong>

//           {' time is '}

//           <span className="Clock__time">
//             {(timeNow.toUTCString().slice(-12, -4))}
//           </span>
//         </div>

//       )}

//     </div>
//   );
// };




