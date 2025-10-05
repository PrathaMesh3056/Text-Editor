import React from "react";
function About() {
  return (
    <div className="container my-3" >
      <h1>About Us</h1>
      <p>
        This is a simple React application that demonstrates the use of state
        management, event handling, and conditional rendering. The app includes
        a text area for input, buttons to manipulate the text, and a navbar for
        navigation.
      </p>
      <p>
        The application allows users to convert text to uppercase or lowercase,
        clear the text area, and preview the entered text. It also features a
        dark mode toggle to switch between light and dark themes.
      </p>
    </div>
  );
}
export default About;