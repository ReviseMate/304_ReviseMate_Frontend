"use strict";(self.webpackChunkfuse=self.webpackChunkfuse||[]).push([[194],{8194:(Z,s,n)=>{n.r(s),n.d(s,{default:()=>A});var u=n(6814),c=n(8109),l=n(8645),r=n(4825),m=n(4716),d=n(812),g=n(9773),h=n(9397),t=n(9212),x=n(4855);function f(o,w){if(1&o&&(t.ynx(0),t._uU(1),t.ALo(2,"i18nPlural"),t.BQk()),2&o){const e=t.oxw();t.xp6(1),t.hij(" Redirecting in ",t.xi3(2,1,e.countdown,e.countdownMapping)," ")}}function v(o,w){1&o&&(t.ynx(0),t._uU(1," You are now being redirected! "),t.BQk())}const p=()=>["/sign-in"],A=[{path:"",component:(()=>{class o{constructor(e,i){this._authService=e,this._router=i,this.countdown=5,this.countdownMapping={"=1":"# second",other:"# seconds"},this._unsubscribeAll=new l.x}ngOnInit(){this._authService.signOut(),(0,r.H)(1e3,1e3).pipe((0,m.x)(()=>{this._router.navigate(["sign-in"])}),(0,d.o)(()=>this.countdown>0),(0,g.R)(this._unsubscribeAll),(0,h.b)(()=>this.countdown--)).subscribe()}ngOnDestroy(){this._unsubscribeAll.next(null),this._unsubscribeAll.complete()}static#t=this.\u0275fac=function(i){return new(i||o)(t.Y36(x.e),t.Y36(c.F0))};static#n=this.\u0275cmp=t.Xpm({type:o,selectors:[["auth-sign-out"]],standalone:!0,features:[t.jDz],decls:15,vars:4,consts:[[1,"flex","flex-col","flex-auto","items-center","sm:justify-center","min-w-0"],[1,"w-full","sm:w-auto","py-8","px-4","sm:p-12","sm:rounded-2xl","sm:shadow","sm:bg-card"],[1,"w-full","max-w-80","sm:w-80","mx-auto","sm:mx-0"],[1,"w-12","mx-auto"],["src","assets/images/logo/logo.svg"],[1,"mt-8","text-4xl","font-extrabold","tracking-tight","leading-tight","text-center"],[1,"flex","justify-center","mt-0.5","font-medium"],[4,"ngIf"],[1,"mt-8","text-md","font-medium","text-secondary","text-center"],[1,"ml-1","text-primary-500","hover:underline",3,"routerLink"]],template:function(i,a){1&i&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),t._UZ(4,"img",4),t.qZA(),t.TgZ(5,"div",5),t._uU(6,"You have signed out!"),t.qZA(),t.TgZ(7,"div",6),t.YNc(8,f,3,4,"ng-container",7)(9,v,2,0,"ng-container",7),t.qZA(),t.TgZ(10,"div",8)(11,"span"),t._uU(12,"Go to"),t.qZA(),t.TgZ(13,"a",9),t._uU(14,"sign in "),t.qZA()()()()()),2&i&&(t.xp6(8),t.Q6J("ngIf",a.countdown>0),t.xp6(1),t.Q6J("ngIf",0===a.countdown),t.xp6(4),t.Q6J("routerLink",t.DdM(3,p)))},dependencies:[u.O5,c.rH,u.Gx],encapsulation:2})}return o})()}]}}]);