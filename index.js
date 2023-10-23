const express = require("express");
const app=express();
app.use(express.json());

let data=[
    {
        Room_ID: "101",
        NumberOfSeats: 100,
        Aminities: ["Tables", "Chairs", "AC", "TV", "HomeTheatre"],
        PriceOneHour: 800,
        CustomerName: "John",
        BookedStatus: "True",
        Date: Date("oct 22, 2023"),
        StartTime: "10:00 AM",
        EndTime: "12:00 PM",
        BookingId: "301",
        BookingDate: Date("Sep 01, 2023"),
        RoomName: "Lotus"
        

    },
    {
        Room_ID: "102",
        NumberOfSeats: 150,
        Aminities: ["Tables", "Chairs", "AC", "TV", "HomeTheatre"],
        PriceOneHour: 1000,
        CustomerName: "John",
        BookedStatus: "True",
        Date: Date("oct 22, 2023"),
        StartTime: "03:00 pm",
        EndTime: "05:00 PM",
        BookingId: "302",
        BookingDate: Date("Sep 01, 2023"),
        RoomName: "Golden"

    },
    {
        Room_ID: "103",
        NumberOfSeats: 100,
        Aminities: ["Tables", "Chairs", "AC", "TV", "HomeTheatre"],
        PriceOneHour: 800,
        CustomerName: "Mubarak",
        BookedStatus: "False",
        Date: "",
        StartTime: "",
        EndTime: "",
        BookingId: "",
        BookingDate: "",
        RoomName: "Lotus"

    }
];

app.post("/room/create",(req,res) => {
    const create={
        Room_ID: "104",
        NumberOfSeats: 150,
        Aminities: ["Tables", "Chairs", "AC", "TV", "HomeTheatre"],
        PriceOneHour: 1000
    };
    // console.log(req.body)
    const createroom = req.body;
    const existId = data.find((val)=> val.Room_ID === createroom.Room_ID)
    if(existId !== undefined){
        return res.status(400).json({message:"room already exists."});
    }
    else{
    data.push(createroom);
    res.status(201).json({message:"room created"});
}
    // data.push(create)
    // res.status(201).json({createdData: data})
    // console.log("checking")

});



app.get("/room/booking", (req, res)=>{
    const {CustomerName, Room_ID, Date, StartTime, EndTime}=req.query
    const bkId = data.find((val)=>( val.Room_ID === (req.query.Room_ID)))
    if(bkId === undefined)
    {
        console.log(req.query)
        console.log("working fine booking")
        return res.send(req.query)
    }
        else
        {            
            return  res.send("All ready Booked")           
        }    
});

app.get("/room/roombooked", (req, res)=>{
    let bkddata= data.filter((val)=>val.BookedStatus === "True")
    // console.log(bkddata)
    res.send({BookedData: bkddata}) 
    
});

app.get("/room/all", (req, res)=>{
    res.send({AllcustomersWithData: data})
});

app.get('/room/:CustomerName', (req, res) => {
    // console.log(req.params)
    const { CustomerName } = req.params;
    
    const customer = data.filter((val) => val.CustomerName === CustomerName);
    
    if (customer === undefined) {
      res.json("Customer not found");
      return;
    }
    else{
        console.log("Customer Booked this much Time:", customer.length)
        res.send(customer)
    }
  }); 


app.listen(8000, ()=>console.log("server started in localhost:8000"))