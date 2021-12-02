import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ThetaFarm from './Theta/App'
import reportWebVitals from './reportWebVitals';


function SwitchByNetwork () {

  
  const networkId = window.localStorage.getItem('chainId')
 
// if(window.location.href.split('?')[1]){
//   const queryString = window.location.href.split('?')[1]
 
//   if (queryString && queryString.split('&')[1]) {
   
//     const [,splitQueryString] = queryString.split('&')

//    if(splitQueryString.split('=')[0]){
//     const [qname, ] = splitQueryString.split('=')
//     if (splitQueryString && qname === 'network') {
//       [, networkId] = splitQueryString.split('=')
//       console.log(networkId)
      

//       if (networkId && networkId === 'theta') {
//         window.localStorage.setItem('chainId', '361')
//         return <ThetaFarm />
//       }

//       if (networkId && networkId === 'meter') {
//         window.localStorage.setItem('chainId', '82')
//         return <App />
//       }
//     }
//     }
//   }
// }

  
  
  if(!networkId){
return(
  <App />
)

  }

  if(networkId && networkId === '361') {
    

    return (
      <ThetaFarm />
    )
  }

  return (
    
    <App />
  )
}

ReactDOM.render(
  <React.StrictMode>
   <SwitchByNetwork/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
