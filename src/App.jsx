import './App.css'
import TitleBar from './components/TitleBar'
import FooterBar from './components/FooterBar'
import WeatherApp from './components/WeatherApp/WeatherApp'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorComponent from './components/ErrorComponent/ErrorComponent'

function App() {
  return (
    <>
      <TitleBar />
      <ErrorBoundary FallbackComponent={ErrorComponent}>
        <WeatherApp />
      </ErrorBoundary>
      <FooterBar />
    </>
  )
}

export default App
