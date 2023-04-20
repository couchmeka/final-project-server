const express = require("express");
const router = express.Router();
const Ticket = require("../Models/Tickets")
// const { MongoClient } = require('mongodb');
const Comment = require("../Models/Comments");






//Get All tickets
async function getAllTickets() {
  try {
    
    const allTickets = await Ticket.find({});
    return { tickets: allTickets };
  } catch (e) {
    console.log(e);
    throw new Error('An error occurred while fetching tickets');
  } finally {
   
  }
}

router.get('/all', async (req, res) => {
    try {
      const tickets = await getAllTickets();
      res.json(tickets);
    } catch (e) {
      console.log(e);
      res.status(500).json({error: e.message});
    }
  });




//Create Ticket
  async function createTicket(ticketData) {
    try {
      const newTicket = await Ticket.create(ticketData);
      console.log('Ticket added successfully:', newTicket);
      return newTicket;
    } catch (e) {
      console.log(e);
      throw new Error('An error occurred while creating the ticket');
    }
  }
  
  router.post('/create-ticket', async (req, res) => {
    try {
      // Create a new ticket object with data from the request body
      const newTicket = new Ticket({
        title: req.body.title,
        text: req.body.text,
        author: req.body.author,
        categories: req.body.categories
      });
  
      // Save the new ticket to MongoDB using the createTicket function
      const savedTicket = await createTicket(newTicket);
  
      // Send a JSON response to the client with the new ticket data
      res.json({ msg: 'Ticket Added Successfully', ticket: savedTicket });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  });
  
  

  //Delete ticket
  async function deleteTicketById(ticketId) {
    try {
      const deletedTicket = await Ticket.deleteOne({id: ticketId});
      console.log('Ticket deleted successfully:', deletedTicket);
      return deletedTicket;
    } catch (e) {
      console.log(e);
      throw new Error('An error occurred while deleting the ticket');
    }
  }

  
  router.delete('/delete-ticket/:id', async (req, res) => {
    try {
        console.log(req.params.id)
      const ticketId = req.params.id;
      // Delete the ticket from MongoDB using the deleteTicketById function
      const deletedTicket = await deleteTicketById(ticketId);
  
      // Send a JSON response to the client with the deleted ticket data
      res.json({ msg: 'Ticket Deleted Successfully', ticket: deletedTicket });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  });
  




//Update Ticket
  async function updateTicket(ticketId, updatedTicketData) {
    try {
      const updatedTicket = await Ticket.updateOne({ id: ticketId }, updatedTicketData);
      console.log('Ticket updated successfully:', updatedTicket);
      return updatedTicket;
    } catch (e) {
      console.log(e);
      throw new Error('An error occurred while updating the ticket');
    }
  }
  
  router.put('/update-ticket/:id', async (req, res) => {
    try {
      const ticketId = req.params.id;
      const updatedTicketData = {
        title: req.body.title,
        text: req.body.text,
        author: req.body.author,
        categories: req.body.categories
      };
      // Update the ticket in MongoDB using the updateTicket function
      const updatedTicket = await updateTicket(ticketId, updatedTicketData);
  
      // Send a JSON response to the client with the updated ticket data
      res.json({ msg: 'Ticket Updated Successfully', ticket: updatedTicket });
    } catch (e) {
      console.log(e);
      res.status(500).json({ error: e.message });
    }
  });
  



  //Add Comment
  async function updateComment(ticketId, commentData) {
    try {
      const updatedComment = await Ticket.updateOne({ id: ticketId }, {comments: commentData});
      console.log('Ticket updated successfully:', updatedComment);
      return updatedComment;
    } catch (e) {
      console.log(e);
      throw new Error('An error occurred while updating the ticket');
    }
  }




  router.put("/comments/:ticketId", async (req, res) => {
   try {
    const ticketId = req.params.ticketId;
    console.log(req.body)
    const newComment = new Comment( 
     {
      comment: req.body.comment,
      createdBy: req.body.createdBy
     }
     );
  
      updateComment(ticketId, newComment)
   } catch (e) {
    if (e) {
      console.error("Error adding the comment:", e);
      return res.status(500).json({ message: "Error adding the comment." });
    } else {
      console.log("Comment added successfully:", updatedComment);
      return res.status(200).json(updatedComment);
    }
  }
   }
  
     
       
    );
 
  
  


module.exports = router;

