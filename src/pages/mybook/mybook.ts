// mybook.ts Methods

// Imports for mybook.ts
import { ListPage } from './../list/list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddbookPage } from '../addbook/addbook';
import { AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { SubmitService } from '../../posts/app.service';

@IonicPage()
@Component({
  selector: 'page-mybook',
  templateUrl: 'mybook.html',
})

// class myBook{
//   Book_Number: number;
//   Book_Name: string;
//   Book_Edition: string;
//   Book_Price: number;
//   Book_type: string;
//   Author_Name: string;
//   Subject_Code: string;
// }

export class MybookPage {
  // data: any[];

  // data;
  // bookNumber;
  // bookName;
  // edition;
  // price;
  // type;
  // author;
  // subject;
  // arr = 0;
  // tableLabel;
  // tableData = [];  

  // books: myBook[];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public alertCtrl: AlertController, 
              private submitService: SubmitService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MybookPage');
  }

  // Method for going to AddBookPage
  onToGoAdd(){
    this.navCtrl.push(AddbookPage);
  }

  //Method for displaying a remove prompt
  showRemovePrompt(){
    // Constant variable for prompt alert with all information
    const prompt = this.alertCtrl.create({
          title: 'Remove',
          message: "Enter the NUMBER of the book that you want to remove.",
          inputs: [{
          name: 'book_number',
          placeholder: 'E.g. 35'
          },],
      //Two buttons with two funtions
      buttons: 
      [
        {
          // Cancel button: When pressed, just close window
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          // Remove button: When pressed run the postRemoveBook Method
          // with the entered data.
          text: 'Remove',
          handler: data => {
            console.log('Removed clicked');
            this.postRemoveBook(data);
          }
        }
      ]
    });
    prompt.present();
  }

  // Method for removing the present page; going to the previous page.
  onGoToMenu(){
     this.navCtrl.pop();
  }

  // Method for displaying the help alert message.
  showHelpAlert() {
    const helpAlert = this.alertCtrl.create({
      title: 'Help!',
      subTitle: `This is a list of all your books, you can add more or remove books.`,
      buttons: ['OK']
    });
    helpAlert.present();
  }

  // POST method to remove a book with the matching book number.
  postRemoveBook(data) {
    console.log(data);

    // Request is send to web service with the book number entered by the student.
    this.submitService.postDeleteBookData(data)

    // Web service gets the request and removes the book
    .subscribe(response => {
      console.log(response);
    },
      (error) => console.log('Problem accuired during book remove.'));
    } 

  // get method for getting the MyBook list and displays the list
  getBookList(){

    //Request is send to web service
    this.submitService.getMyBookData()

    // Service sends the book list
    .subscribe(response => {
      console.log(response);

     // this.books = response[0];

      // this.tableLabel = response[0].labels;

      // let arr = 0;
      // while(response[arr] != null){
      //   this.tableData.push(response[arr]);
      //   arr++;
      // }

      // console.log(this.tableData);
      // console.log(this.tableLabel);

      // this.data = response;
      // this.bookNumber = this.data[this.arr].Book_Number;
      // this.bookName = this.data[this.arr].Book_Name;
      // this.edition = this.data[this.arr].Book_Edition;
      // this.type = this.data[this.arr].Book_Type;
      // this.author = this.data[this.arr].Author_Name;
      // this.subject = this.data[this.arr].Subject_Code;

    },
    (error) => console.log('Problem accuired during book retrieval.'));
  }  

}

 


