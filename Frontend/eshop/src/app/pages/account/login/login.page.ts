import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonList, IonItem, IonInput, IonIcon, IonButton } from '@ionic/angular/standalone';
import { DataService } from 'src/app/data.service';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { UserModel } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { SecurityUtil } from 'src/app/utils/security.util';






@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonInput, IonItem, IonList, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]

})
export class LoginPage implements OnInit {


  public hide = true;
  public form: FormGroup;

  constructor(
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private service: DataService
  ) {
    this.form = this.fb.group({
      username: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    })
  }

  async submit() {
    console.log("o submit")
    if (this.form.invalid)
      return;

    const loading = await this.loadingCtrl.create({ message: 'Autenticando ...' });
    loading.present();

    this
      .service
      .authenticate(this.form.value)
      .subscribe(
        (res: any) => {
          console.log("Resposta da API: ", res)
          SecurityUtil.set(res);
          loading.dismiss();
          this.navCtrl.navigateRoot('/');
        },
        (err) => {
          this.showError('Usuário ou senha inválidos');
          loading.dismiss();
        });


    console.log('Formulário submetido');
  }

  // authenticate(credentials: any): Observable<UserModel> {
  //   return this.httpClient.post<UserModel>(/* URL da API */, credentials);
  // }

  ngOnInit() {
  }

  toogleHide() {
    console.log("aqui");
    this.hide = !this.hide;
  }

  async resetPassword() {
    if (this.form.controls['username'].invalid) {
      this.showError("Usuário inválido");
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Restaurando a senha ...' });
    loading.present();
  }

  async showError(message: string) {
    // const error = await this.toastCtrl.create(
    //   {message: message, 
    //     showCloseButton: true, 
    //     closeButtonText: 'Fechar', 
    //     duration: 3000});
    // error.present();

    const toastError = await this.toastCtrl.create({
      message: message,
      duration: 3000, // Duração de 3 segundos
      buttons: [
        {
          text: 'Fechar', // Texto do botão
          role: 'cancel' // Fecha o Toast ao clicar
        }
      ]
    });
  }
}
