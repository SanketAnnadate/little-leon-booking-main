import './App.css'
import BookingForm from './components/BookingForm.jsx'

function App() {
  return (
    <div className="app">
      <header className="site-header" role="banner">
        <nav aria-label="Primary" className="nav">
          <a className="brand" href="#" aria-label="Little Lemon home">
            <img src="./logo.jpg" className="brand-logo" alt="Little Lemon Logo" />
          </a>
        </nav>
      </header>
      <main id="main" className="site-main" role="main">
        <section className="hero" aria-labelledby="book-heading">
          <div className="container">
            <h1 id="book-heading">Book a table</h1>
            <p className="lead">Reserve your spot at Little Lemon. We offer lunch and dinner seatings daily.</p>
          </div>
        </section>
        <section aria-label="Booking form" className="container">
          <BookingForm />
        </section>
      </main>
      <footer className="site-footer" role="contentinfo">
        <div className="container">
          <small>© {new Date().getFullYear()} Little Lemon. All rights reserved.</small>
        </div>
      </footer>
    </div>
  )
}

export default App
