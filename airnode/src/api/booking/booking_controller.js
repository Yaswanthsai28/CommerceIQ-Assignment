
const { bookingModel,airportModel, sequelize } = require("./booking_model");

const emailValidate = (email) => {

	const mailFormat = /^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})?$/;

	if(mailFormat.test(email)) return true;
	
	return false;
};

const phoneValidate = (mobilePhone) => {

	const mobileFormat = /^\d{10}$/;

	if(mobileFormat.test(mobilePhone)) return true;
	
	return false;
};

const ticketingValidate = (ticketingDate,travelDate) => {

	const before = new Date(ticketingDate);
    const after = new Date(travelDate);

    // console.log(before,after);

	if(before < after) return true;
	
	return false;
};

const PNRValidate = (PNR) => {

	const PNRFormat = /^([a-zA-Z0-9]+){6}$/;

	if(PNRFormat.test(PNR)) return true;
	
	return false;
};

let bookedCabins = ["Economy", "Premium Economy", "Business", "First"];

const bookedCabinValidate = (bookedCabin) => {

	if(bookedCabins.indexOf(bookedCabin) !== -1) return true;
	
	return false;
};

let mp={};

const compare = (obj1,obj2) =>{

	if(mp[obj1.booking.userID] > mp[obj2.booking.userID]) return true;

	else if(bookedCabins.indexOf(obj1.booking.bookedCabin) < bookedCabins.indexOf(obj2.booking.bookedCabin)) return true;

	else if(obj1.booking.age > obj2.booking.age) return true;

	return obj1.booking.bookingid < obj1.booking.bookingid;
}

const validate = async (req, res) => {
	let obj = req.body;
	// console.log(req.body);
	try {

		let data = obj.data;

		let validData=[] , invalidData=[];

		for(let i=0;i<data.length;i++){

			let el=data[i] , invalid={};

			if(!emailValidate(el.email)){
				invalid.email="Email is incorrect";
			}
			if(!phoneValidate(el.mobilePhone)){
				invalid.mobilePhone="mobilePhone is incorrect";
			}
			if(!ticketingValidate(el.ticketingDate,el.travelDate)){
				invalid.mobilePhone="ticketingDate is incorrect";
			}

			//console.log(el.ticketingDate,el.travelDate);
			//console.log(typeof el.ticketingDate,typeof el.travelDate);

			if(!PNRValidate(el.PNR)){
				invalid.PNR="PNR is incorrect";
			}
			if(!bookedCabinValidate(el.bookedCabin)){
				invalid.bookedCabin="bookedCabin is incorrect";
			}

			const boardings = await airportModel.findAll({
	        where: {
			boarding: el.boarding,
	        destination: el.destination,
	           }
            });

			if(boardings.length === 0) invalid.boardings="boarding and destination not found";

			if(Object.keys(invalid).length === 0){
				const booking = await bookingModel.create({
					firstName: el.firstName,
					lastName: el.lastName,
					PNR: el.PNR,
					fareClass: el.fareClass,
					travelDate: el.travelDate,
					ticketingDate: el.ticketingDate,
					email: el.email,
					mobilePhone: el.mobilePhone,
					bookedCabin: el.bookedCabin,
					boarding: el.boarding,
					destination: el.destination,
					userID: el.userID,
					age: el.age,
					valid: true,
				});

				let afterValidation = {booking,msg:"Validation Successful!"};

				validData.push(afterValidation);
			}
			else{
				const booking = await bookingModel.create({
					firstName: el.firstName,
					lastName: el.lastName,
					PNR: el.PNR,
					fareClass: el.fareClass,
					travelDate: el.travelDate,
					ticketingDate: el.ticketingDate,
					email: el.email,
					mobilePhone: el.mobilePhone,
					bookedCabin: el.bookedCabin,
					boarding: el.boarding,
					destination: el.destination,
					userID: el.userID,
					age: el.age,
					valid: false,
				});

				let afterValidation = {booking,msg: invalid};

				invalidData.push(afterValidation);
			}
			
		}

		res.status(201).send({

			validData,
			invalidData,

		});
	} catch (err) {
		console.log(err);
		res.status(400).send({
			msg: "error",
		});
	}
};


const getBooking = async (req, res) => {
	
	try {

		let date = req.query.date;
		let PNR = req.query.PNR;

		// console.log(date,PNR);

		let sql = "select * from bookings where travel_date = "+ date + " and p_n_r = " + PNR + ";";

		const bookings = await sequelize.query(sql, {
			type: "SELECT",
		});


		res.status(200).send({

			bookings,
			msg:"Successful",

		});
	} catch (err) {
		console.status(400).log(err);
		res.send({
			msg: "error",
		});
	}
};

const getUserBookings = async (req, res) => {
	try {

		let userID = req.query.userID;

		let sql = "select * from bookings where user_i_d = " + userID + ";";

		const bookings = await sequelize.query(sql, {
			type: "SELECT",
		});


		res.status(200).send({

			bookings,
			msg:"Successful",

		});
	} catch (err) {
		console.status(400).log(err);
		res.send({
			msg: "error",
		});
	}
};

const getMostFrequentTravellers = async (req, res) => {
	try {

		let sql = "select distinct s.user_i_d,s.first_name,s.last_name,d.cnt from bookings as s , (select user_i_d,count(bookingid) as cnt from bookings group by user_i_d order by count(bookingid) DESC) as d where s.user_i_d=d.user_i_d order by d.cnt DESC;"

		const mostTravellers = await sequelize.query(sql, {
			type: "SELECT",
		});

		res.status(200).send({

			mostTravellers,
			msg:"Successful",

		});
	} catch (err) {
		console.status(400).log(err);
		res.send({
			msg: "error",
		});
	}
};

const ConfirmBooking = async (req, res) => {
	let obj = req.body;

	try {

		let data = obj.data , confirmedData = [];

		let map = "select user_i_d,count(bookingid) from bookings group by user_i_d order by count(bookingid) DESC;";

		mp = await sequelize.query(map, {
			type: "SELECT",
		});

		data.sort(compare);

		console.log(data);

		for(let i=0;i<data.length;i++){

			let el=data[i].booking;

			el.bookedTime = new Date();
			el.conform = true;

			const updateResp = await bookingModel.update(el, {
				returning: true,
				where: {
					bookingid : el.bookingid,
				},
			});

			confirmedData.push(updateResp);
			
			}
		

		res.status(200).send({

			confirmedData,

		});
	} catch (err) {
		console.status(400).log(err);
		res.send({
			msg: "error",
		});
	}
};



module.exports = {
	validate,
	getBooking,
	getUserBookings,
	getMostFrequentTravellers,
	ConfirmBooking,
};
