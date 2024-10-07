/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1, userName: 'Jack', phone: '88885555',
    bookingTime: (new Date()).toDateString(),
    bookedSeat: [1,1], // represent the row and column of the seat respectively
  },
  {
    id: 2, userName: 'Rose', phone: '88884444',
    bookingTime: (new Date()).toDateString(),
    bookedSeat: [2,2],
  },
];

const Travellers = JSON.parse(JSON.stringify(initialTravellers));
const rows = 5; // number of rows in the train
const cols = 2; // number of seats in each row
const capacity = rows*cols; // total capacity of seats


function TravellerRow(props) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/}
  console.log('props.passenger', props.passenger);
  const passenger = props.passenger;
  const traveller_id = passenger.id;
  const traveller_name = passenger.userName;
  const traveller_phone = passenger.phone;
  const traveller_bookingTime = passenger.bookingTime;
  const traveller_seatRow = passenger.bookedSeat[0];
  const traveller_seatCol = passenger.bookedSeat[1];

  const traveller_information = <>
  <td>{traveller_id}</td>
  <td>{traveller_name}</td>
  <td>{traveller_phone}</td>
  <td>{traveller_bookingTime}</td>
  <td>Row {traveller_seatRow}, Column {traveller_seatCol} </td>
  </>;

  console.log('traveller_information', traveller_information);

  return (
    <tr>
      {traveller_information}
      {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
    </tr>
  );
}

function Display(props) {

  const displayedTravellers = props.passengers.map((person,rowIdx) => (<TravellerRow passenger={person} key={rowIdx}/>));
  console.log('displayed_travellers', displayedTravellers);

	/*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/

  return (
    <table className="bordered-table">
      <thead>
        <tr>
          {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Booking Time</th>
          <th>Booked Seat</th>
        </tr>
      </thead>
      <tbody>
        {displayedTravellers}
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const add_form = document.forms.addTraveller;

    const add_passenger = {
      userName: add_form.addName.value,
      phone: add_form.addPhone.value,
      bookingTime: add_form.addBookingTime.value,
      seatRow: Number(add_form.addBookedSeatRow.value),
      seatCol: Number(add_form.addBookedSeatCol.value),
    }
    if (Object.values(add_passenger).some(v => v === '')){
      alert('Error! You have not entered all the required fields.');
    }
    else{
      this.props.bookTraveller(add_passenger); 
    }
    add_form.reset();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
        {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <input type="text" name="addName" placeholder="Name" style={{width:'180px'}} /><br/>
        <input type="number" name="addPhone" min="00000000" max='99999999' placeholder="Phone" style={{width:'180px'}} /><br/>
        <input type="date" name="addBookingTime" placeholder="Booking time" style={{width:'180px'}} /><br/>
        <input type="number" name="addBookedSeatRow" min="1" max={rows} placeholder="Seat row to book" style={{width:'180px'}} /><br/>
        <input type="number" name="addBookedSeatCol" min="1" max={cols} placeholder="Seat column to book" style={{width:'180px'}} /><br/>
        <button>Add</button>
      </form>
      
    );
  }
}

class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const delete_form = document.forms.deleteTraveller;

    const delete_passenger = {
      Id: Number(delete_form.deleteId.value),
      userName: delete_form.deleteName.value,
    }

    if (Object.values(delete_passenger).some(v => v === '')){
      alert('Error! You have not entered all the required fields.');
    }
    else{
      this.props.deleteTraveller(delete_passenger);
    }
    delete_form.reset();

    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
      {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
      <input type="number" name="deleteId" placeholder="ID" min="1" style={{width:'180px'}} /><br/>
      <input type="text" name="deleteName" placeholder="Name" style={{width:'180px'}} /><br/>
      <button>Delete</button>
      </form>
    );
  }
}

class Homepage extends React.Component {
	constructor() {
	super();
  this.showSeats = this.showSeats.bind(this);
	}

  showSeats(){
    const passengers = this.props.passengers;
    const seats = Array.from({length: rows},() => Array.from({length: cols},()=>true))
    passengers.forEach(person=>seats[person.bookedSeat[0]-1][person.bookedSeat[1]-1]=false);
    const seat_map = seats.map((row,rowIdx)=>(<tr key={rowIdx}>{row.map((col,colIdx)=>(<td key={colIdx} style={{backgroundColor:col? "green":"grey",width:"120px",height:"40px"}}></td>))}</tr>));
    return seat_map;
  }

	render(){
    const seat_map = this.showSeats();
    return (
	<div>
    <table>
      <tbody>
        {seat_map}
      </tbody>
    </table>
    
		{/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
	</div>);
	}
}

class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: 1};
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
  }

  setSelector(value)
  {
    this.setState({selector: value});
    /*Q2. Function to set the value of component selector variable based on user's button click.*/
  }
  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    await new Promise(resolve => { setTimeout(() => {
      this.setState({ travellers: initialTravellers },resolve);
    }, 500);});
    console.log(this.state.travellers);
  }

  bookTraveller(passenger) {
    const name_to_add = passenger.userName;
    const phone_to_add = passenger.phone;
    const bookingTime_to_add = passenger.bookingTime;
    const seatRow_to_add = passenger.seatRow;
    const seatCol_to_add = passenger.seatCol;
    
    if (this.state.travellers.length === capacity){
      alert('Error! All seats are full.');
    }
    else if (this.state.travellers.find(traveller => traveller.bookedSeat[0] === seatRow_to_add && traveller.bookedSeat[1] === seatCol_to_add)){
      alert('Error! The seat you entered is already booked.');
    }
    else{
      const new_id = this.state.travellers[this.state.travellers.length-1].id + 1;
      const new_passenger = {id: new_id, userName: name_to_add, phone: phone_to_add, bookingTime: bookingTime_to_add, bookedSeat: [seatRow_to_add, seatCol_to_add]};
      Travellers.push(new_passenger);
      this.setState({travellers: Travellers});
      alert('Passenger added successfully.');
    }
    /*Q4. Write code to add a passenger to the traveller state variable.*/
  }

  deleteTraveller(passenger) {
    const id_to_delete = passenger.Id;
    const name_to_delete = passenger.userName;
    const idx_to_delete = this.state.travellers.findIndex(person => person.id === id_to_delete && person.userName === name_to_delete);
    if (this.state.travellers.length==0){
      alert('Error! There are no passengers to delete.');
    }
    else if (idx_to_delete === -1){
      alert('Error! The ID or name you entered does not exist.');
    }
    else{
      Travellers.splice(idx_to_delete,1);
      this.setState({travellers: Travellers});
      alert('Passenger deleted successfully.');
    }
    
    /*Q5. Write code to delete a passenger from the traveller state variable.*/
  }

  render() {
    return (
      <div>
        <h1>Ticket To Ride</h1>
	<div>
    <nav>
      <button onClick={() => this.setSelector(1)}>Homepage </button>
      <button onClick={() => this.setSelector(2)}>Display Traveller </button>
      <button onClick={() => this.setSelector(3)}>Add Traveller </button>
      <button onClick={() => this.setSelector(4)}>Delete Traveller </button>
    </nav>
    {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
	</div>
	<div>
		{/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}

    
	</div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
