// import modules from the react package useState and useEffect
import React, { useState, useEffect } from 'react';
// bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// funcational coponent 
function App() {
  //declares a state variable named setpeople initialized with an empty array.
  const [people, setPeople] = useState([]);
  // Create a state variable newPerson and a function setNewPerson to update its value
  const [newPerson, setNewPerson] = useState({ firstName: '', lastName: '', email: '', id:'' });
// call the fetchPeople function when the component is rendered for the first time
  useEffect(() => {
    fetchPeople();
  }, []);

// This block of code defines an asynchronous function fetchPeople that fetches data from a remote API 
//endpoint using the fetch function. It retrieves the response, parses it as JSON, and updates the people
// state variable with the fetched data. It also handles errors by logging them to the console
  const fetchPeople = async () => {
    try {
      const response = await fetch('https://645a846595624ceb21044cb2.mockapi.io/users');
      const data = await response.json();
      setPeople(data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

// declares variable editingperson and function seteditingperson to update its value.
//initialized wiht null.
  const [editingPerson, setEditingPerson] = useState(null);
  //an asynchronous function addperson that handles the addition or update of a person's data.
  const addPerson = async () => {
    try {
      if (editingPerson) {
        //fetches data from API
        //// Send a PUT request to update the existing person's data
        // Send the updated person's data in the request body
        const response = await fetch(`https://645a846595624ceb21044cb2.mockapi.io/users/${editingPerson.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newPerson)
        });
        // fetch the updated list of people
        //Reset the editingperson state variable
        // Reset the newperson state variable
        // Reset the editingperson state variable
        if (response.ok) {
          fetchPeople();
          setNewPerson({ firstName: '', lastName: '', email: '' , id:'' });
          setEditingPerson(null);
        }
      } else {
        //fetches data from API
        // Send a POST request to create a new person
        // Send the new person's data in the request
        const response = await fetch('https://645a846595624ceb21044cb2.mockapi.io/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newPerson)
        });
        // Fetch the updated list of people
        // Reset the newperson state variable
        if (response.ok) {
          fetchPeople();
          setNewPerson({ firstName: '', lastName: '', email: '', id:'' });
        }
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  // Set the editingperson state variable to the selected person data
  const editPerson = (person) => {
    setNewPerson({
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email,
      id: person.id
    });
    setEditingPerson(person);
  };

  // Send a DELETE request to remove a person
  const deletePerson = async (id) => {
    try {
      //fetches data from API
      // Fetch the updated list of people
      //handles the deletion of a person data.
      const response = await fetch(`https://645a846595624ceb21044cb2.mockapi.io/users/${id}`,{
        method: 'DELETE'
      });
      if (response.ok) {
        fetchPeople();
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  //This below code defines that will be rendered by the component. It returns a container div.
  // div, form ,input,table and button,
  return (
    <div className="container">
      <h3 className="text-center">CRUD Application Submit, Edit, Delete</h3><br></br>
     <div>
      <form className="row justify-content-lg-center input-group-sm mb-5 form-control-sm">
     
        <input
          type="text" 
          placeholder="First Name"
          value={newPerson.firstName}
          onChange={(e) => setNewPerson({ ...newPerson, firstName: e.target.value })}
        />
        <input
          type="text" 
          placeholder="Last Name"
          value={newPerson.lastName}
          onChange={(e) => setNewPerson({ ...newPerson, lastName: e.target.value })}
        />
        <input
          type="email" 
          placeholder="Email"
          value={newPerson.email}
          onChange={(e) => setNewPerson({ ...newPerson, email: e.target.value })}
        />

        <input
          type="id" 
          placeholder="Id"
          value={newPerson.id}
          onChange={(e) => setNewPerson({ ...newPerson, id: e.target.value })}
        /> 
        <button className="btn btn-outline-success" type="button" onClick={addPerson}>
          {editPerson ? 'Submit' : 'Save'}
        </button>
        
      </form> <br></br><br></br>
      </div>
     
     
      <table  className="table table-hover table-bordered table-sm table-responsive-sm">
        <thead>
          <tr className="table-active">
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>ID</th>
            <th>Action</th>
          </tr> 
        </thead> 

        <tbody>
          {people.map((person) => (
            <tr key={person.id}>
              <td>{person.firstName}</td>
              <td>{person.lastName}</td>
              <td>{person.email}</td>
              <td>{person.id}</td>

              <td className=''>
                <button className="btn btn-outline-warning" type="button" onClick={() => editPerson(person)}>Edit</button>
                <button className="btn btn-outline-danger" type="button" onClick={() => deletePerson(person.id)}>Delete</button> 
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
// export the app
export default App;
