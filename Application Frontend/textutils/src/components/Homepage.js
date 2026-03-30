import './Home.css';
import CustomButton from './CustomButton.js';

export default function Home(props) {

    const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className={`home-container ${props.mode}`} >
      <div className="container py-5">
        <h1 className={`text-center fw-bold mb-4 ${props.mode === 'dark' ? 'text-light' : 'text-dark'}`}>
          Welcome to <span style={{ color: "#7a23b5" }}>JournalEase</span>
        </h1>
        <p className="lead text-center mb-5">
          Your personal space to jot down your daily experiences, thoughts, and emotions.
          Whether you're tracking your mood, writing about your day, or reflecting on life —
          JournalEase offers a clean, distraction-free space for self-expression.
        </p>

        <div className="row align-items-center text-center text-md-start">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src="/round-icons-Tb82oPKBGlo-unsplash.jpg"
              alt="Journal Illustration"
              className="img-fluid rounded shadow"
              style={{ maxHeight: "350px" }}
            />
          </div>
          <div className="col-md-6 d-flex flex-column align-items-center align-items-md-start">

            {!isLoggedIn &&(
              <CustomButton text = "Get Started" to="/login" imageSrc='/1a226409-4e94-415f-af9b-7128e62fb895.jpg'/>
            )}
          
            {isLoggedIn &&(
              <CustomButton text = "Log Journal" to="/textform" imageSrc='/My icons collection.jpg'/>
            )}

            {isLoggedIn &&(
              <CustomButton className='my-5' to="/entries" text = "Read All Entries"  imageSrc='/an open book.jpeg'/>
            )}
            {/* <SquareButton title = "Reflections" preview="In the vast tapestry of human thought and expression, journaling has always held a unique place as both a reflective and generative process. Whether chronicling daily events, recording dreams, or expressing unfiltered emotions, journals become windows into the soul — preserving not only memories, but the essence of how we feel about them. Over time, these pages form a silent companion, witnessing our growth, grief, breakthroughs, and regressions. In today’s digital age, where every thought can be shared instantly, the private intimacy of a journal stands in quiet contrast — a place where one can be truly honest, unjudged, and free. It reminds us that our thoughts matter, even when no one else sees them."/> */}
          </div>
        </div>
      </div>
    </div>
  );
}
