import { Component, ElementRef, OnInit } from '@angular/core';
// import * as tmImage from '@teachablemachine/image';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { join } from 'path';
// import { File } from '@awesome-cordova-plugins/file/ngx';

declare var tmImage: any;

type Label = {
  id: number;
  className: string;
  prob: string;
};

@Component({
  selector: 'app-ai-scan',
  templateUrl: './ai-scan.page.html',
  styleUrls: ['./ai-scan.page.scss'],
})
export class AiScanPage implements OnInit {
  labels: Label[] = [];
  webcam: any;
  model: any;
  imgURL?: string;

  constructor(
    // private file: File,
    private router: Router,
    private elementRef: ElementRef // private actionSheetController: ActionSheetController,
  ) { }

  async ngOnInit() {
    const modelURL = '/assets/ai-model/model.json';
    const metadataURL = '/assets/ai-model/metadata.json';
    this.model = await tmImage.load(modelURL, metadataURL);

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    this.webcam = new tmImage.Webcam(350, 350, flip); // width, height, flip

    await this.webcam.setup(); // request access to the webcam
    await this.webcam.play();

    // append elements to the DOM
    this.elementRef.nativeElement
      .querySelector('.webcam-container')
      .appendChild(this.webcam.canvas);
    window.requestAnimationFrame(() => this.loop());
  }

  next() {
    delete this.imgURL;
  }

  async capture() {
    this.imgURL = this.webcam.canvas.toDataURL('image/png');

    const prediction: { probability: number; className: string }[] =
      await this.predict();
    // console.log(prediction);

    prediction
      .map((pred, i) => ({
        className: pred.className,
        probability: pred.probability,
        id: i + 1,
      }))
      .sort((a, b) => b.probability - a.probability)
      .slice(0, 5)
      .forEach((prediction, i) => {
        this.labels[i] = {
          id: prediction.id,
          className: prediction.className,
          prob: (prediction.probability * 100).toFixed(0) + '%',
        };
      });
    //如果想彈出黎
    // let sheet = await this.actionSheetController.create({
    //   buttons: [
    //     ...prediction.map((pred, i) => ({
    //       text: `${pred.className} (${(pred.probability * 100).toFixed(0)}%)`,
    //       handler: () => {
    //         this.router.navigateByUrl('/bean/' + (i + 1));
    //       },
    //     })),
    //     {
    //       text: 'Dismiss',
    //       role: 'cancel',
    //     },
    //   ],
    // });
    // await sheet.present();
  }

  async loop() {
    await this.webcam.update(); // update the webcam frame
    // await this.predict();
    await window.requestAnimationFrame(() => this.loop());
  }

  async predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await this.model.predict(this.webcam.canvas);

    await this.labels.forEach((label, i) => {
      label.prob = (prediction[i].probability * 100).toFixed(0) + '%';
      label.className = prediction[i].className;
    });

    return prediction;
  }

  // ionViewWillLeave() {
  //   this.webcam.stop();
  // }
}




// for(let a of result){
//     eventObj.title = a.event_name;
//     eventObj.start =  a.date + "T" + a.start_time;
//     eventObj.end = a.date + "T" + a.end_time;
//     events.push(eventObj)

// }
// console.log(events);
// return events;

;