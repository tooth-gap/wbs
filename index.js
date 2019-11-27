const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = new express();
app.use(cors());
mongoose.connect(
    "mongodb+srv://WBSystem:wbs_itsd@cluster0-csnyq.mongodb.net/test?retryWrites=true&w=majority",{
        useUnifiedTopology : true,
        useNewUrlParser : true
    }
);

app.use(express.static(__dirname + '/dist/WBSystem-ver3'));
const urlEncoded = bodyParser.json();

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/dist/WBSystem-ver3/index.html');
});

const User = mongoose.model('user',{
    name: {
        type: String,
        require: true
    },
    username: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

app.get('/user/:username/:password', (req, res) => {
    User.find({username:req.params.username,password:req.params.password},(err, data) => {
    if(err) res.json({"msg":"Invalid Request"});
        res.json(data);
    });
});

app.get('/user', (req, res) => {
    User.find({},(err, data) => {
    if(err) res.json({"msg":"Invalid Request"});
        res.json(data);
    });
});

app.get('/user/:id', (req, res) => {
    User.findOne({_id:req.params.id},(err, data) => {
    if(err) res.json({"msg":"Invalid Request"});
        res.json(data);
    });
});
app.post('/user', urlEncoded, (req, res) => {
    var user = new User({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    });
    user.save((err, data) => {
        if(err) res.json({"msg":"Invalid Request"});
        res.json(data);
    });
});

app.put('/user/:id', urlEncoded, (req, res) => {
    User.updateOne({_id:req.params.id},{
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    }, (err, data) => {
        if(err) res.json({msg:'Invalid request'});
            res.json(data);
    });
});

app.delete('/user/:id', (req, res) => {
    User.deleteOne({_id:req.params.id},(err,data) => {
    if(err) res.json({msg:'Invalid Request'});
        res.json(data);
    });
});

const Consumer = mongoose.model('consumer', {
    name: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    phoneNo: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true
    },
  
});

app.get('/consumer', (req, res) => {
    Consumer.find({},(err, data) => {
    if(err) res.json({"msg":"Invalid Request"});
        res.json(data);
    });
});

app.get('/consumer/:id', (req, res) => {
    Consumer.findOne({_id:req.params.id},(err, data) => {
    if(err) res.json({"msg":"Invalid Request"});
        res.json(data);
    });
});
app.post('/consumer', urlEncoded, (req, res) => {
    var consumer = new Consumer({
        name: req.body.name,
        location: req.body.location,
        phoneNo: req.body.phoneNo,
        email: req.body.email
    });
    consumer.save((err, data) => {
        if(err) res.json({"msg":"Invalid Request"});
        res.json(data);
    });
});

app.put('/consumer/:id', urlEncoded, (req, res) => {
    Consumer.updateOne({_id:req.params.id},{
        name: req.body.name,
        location: req.body.location,
        phoneNo: req.body.phoneNo,
        email: req.body.email
    }, (err, data) => {
        if(err) res.json({msg:'Invalid request'});
            res.json(data);
    });
});

app.delete('/consumer/:id', (req, res) => {
    Consumer.deleteOne({_id:req.params.id},(err,data) => {
    if(err) res.json({msg:'Invalid Request'});
        res.json(data);
    });
});

const Transaction = mongoose.model('transaction', {
        previous_date: {
        type: String,
        require: true
    },
    previous_record: {
        type: Number,
        require: true
    },
    current_date: {
        type: String,
        require: true
    },
    current_record: {
        type: String,
        require: true
    },
    consumption:{
        type: Number,
        require: true
    },
    due_payment_date:{
        type: String,
        require: true
    },
    current_amount_due:{
        type: Number,
        require: true
    },
    unpaid_month:{
        type: Number,
        require: true
    },
    consumerId:{
        type: String, 
        require: true      
    }
});

app.get('/transaction', (req, res) => {
    Transaction.find({},(err, data) => {
    if(err) res.json({"msg":"Invalid Request"});
        res.json(data);
    });
});

app.get('/transaction/:id', (req, res) => {
    Transaction.findOne({_id:req.params.id},(err, data) => {
    if(err) res.json({"msg":"Invalid Request"});
        res.json(data);
    });
});

app.get('/transaction/view/:id', (req, res) => {
    Consumer.find({_id:req.params.id},(err, data) => {
    if(err) res.json({"msg":"Invalid Request"});
        res.json(data);
    });
});

app.get('/transaction/consumer/:id', (req, res) => {
    Transaction.find({consumerId:req.params.id},(err, data) => {
    if(err) res.json({"msg":"Invalid Request"});
        res.json(data);
    });
});

app.post('/transaction', urlEncoded, (req, res) => {
    var transaction = new Transaction({
        previous_date: req.body.previous_date,
        previous_record: req.body.previous_record,
        current_date: req.body.current_date,
        current_record: req.body.current_record,
        consumption: req.body.consumption,
        due_payment_date: req.body.due_payment_date,
        current_amount_due: req.body.current_amount_due,
        unpaid_month: req.body.unpaid_month,
        consumerId: req.body.consumerId,
    }); 
    transaction.save((err, data) => {
        if(err) res.json({"msg":"Invalid Request"});
        res.json(data);
    });
});

app.put('/transaction/:id', urlEncoded, (req, res) => {
    Transaction.updateOne({_id:req.params.id},{
        previous_date: req.body.previous_date,
        previous_record: req.body.previous_record,
        current_date: req.body.current_date,
        current_record: req.body.current_record,
        consumption: req.body.consumption,
        due_payment_date: req.body.due_payment_date,
        current_amount_due: req.body.current_amount_due,
        unpaid_month: req.body.unpaid_month,
    }, (err, data) => {
        if(err) res.json({msg:'Invalid request'});
            res.json(data);
    });
});

app.delete('/transaction/:id', (req, res) => {
    Transaction.deleteOne({_id:req.params.id},(err,data) => {
    if(err) res.json({msg:'Invalid Request'});
        res.json(data);
    });
});

const PORT = 80;
app.listen(PORT,(err) => {
    if(err) throw err;
    console.log(`Server running at port ${PORT}`);
    }
);