import React from 'react';

export default function About(props) {
  const myStyle = {
    color: props.mode === 'dark' ? 'white' : 'black',
    backgroundColor: props.mode === 'dark' ? '#2b2b40' : 'white',
    borderRadius: '10px',
    padding: '20px',
    border: props.mode === 'dark' ? '1px solid white' : '1px solid #ccc'
  };

  return (
    <div className="container my-4" style={myStyle}>
      <h2 className="mb-4">About Us</h2>
      <div className="accordion" id="aboutAccordion">
        <div className="accordion-item" style={myStyle}>
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button" type="button" data-bs-toggle="collapse"  data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style={myStyle}>
              📓 About the Journal App
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#aboutAccordion">
            <div className="accordion-body">
              Our Journal Entry App helps you record your thoughts, events, and ideas.
            </div>
          </div>
        </div>

        <div className="accordion-item" style={myStyle}>
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" style={myStyle}>
              🎯 Our Mission
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#aboutAccordion">
            <div className="accordion-body">
              We aim to make journaling simple, secure, and accessible.
            </div>
          </div>
        </div>

        <div className="accordion-item" style={myStyle}>
          <h2 className="accordion-header" id="headingThree">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" style={myStyle}>
              💡 How to Use
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#aboutAccordion">
            <div className="accordion-body">
              Just log in, write, and save your journal entries. You can edit or delete them any time.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
