import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { ApiServiceProvider } from '../../../providers/api-service/api-service';

declare const $: any;
declare const swal: any;
@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

    loginForm: FormGroup;
    submitted = false;
    returnUrl: string;
    resposeData:any;


    constructor(private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        public authService: ApiServiceProvider,
        private router: Router) { }

    ngOnInit() {
        
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        //    [Focus input] * /
        $('.input100').each(function () {
            $(this).on('blur', function () {
                if ($(this).val().trim() != "") {
                    $(this).addClass('has-val');
                }
                else {
                    $(this).removeClass('has-val');
                }
            })
        })
    }
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        let postDat:any;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
           swal("กรอกข้อมูลไม่ครบ!","","error")
            return;
        } else {
            postDat=this.loginForm.value;
            this.authService.postData(postDat, "user/login").then((result) =>{
            this.resposeData=result
            console.log(result);
                if(this.resposeData.status=="success")
                {
                    swal("เข้าสู่ระบบ!", "", "success");
                    this.router.navigate(['/dashboard/main']);
                    localStorage.setItem("mee-login",JSON.stringify(this.resposeData.data));
                }
                else
                {
                    swal("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง", "", "error");
                    return;
                }
   
              
              }, (err) => {
  
              });

            

        }


    }

}






 

