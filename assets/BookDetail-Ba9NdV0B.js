import{b as m}from"./book.service-BUwmwyft.js";import{_ as u,m as c,c as i,a as t,t as s,b as d,E as h,F as k,r as f,i as g,w as p,v,o as l}from"./index-HVgC_N1k.js";const y={name:"BookDetail",data(){return{book:{tensach:"",tacgia:"",dongia:0,soquyen:0,anhbia:"",nxb:{tennxb:"",diachi:""}},newComment:{comment:"",date:new Date().toLocaleString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0})}}},created(){this.getBook()},computed:{...c("auth",["user","isAuthenticated"])},methods:{goBack(){this.$router.go(-1)},async getBook(){const a=this.$route.params.id,o=await m.get(a);this.book=o},async submitComment(){if(!this.newComment.comment)return;if(console.log(this.user),!this.isAuthenticated){this.$router.push("/login");return}const a=this.$route.params.id;this.book.binhluan||(this.book.binhluan=[]),await m.update(a,{...this.book,binhluan:[...this.book.binhluan,{customer:this.user.hoten,comment:this.newComment.comment,date:this.newComment.date}]}),this.newComment.comment="",this.getBook()},addBookToCart(a){this.$store.dispatch("cart/addToCart",{product:a,quantity:1})}}},x={class:"card px-5 pt-4 pb-5 my-5"},_={class:"d-flex justify-content-start mb-3"},C={class:"row"},w={class:"col-md-4 d-flex justify-content-center"},B=["src"],T={class:"col-md-8"},q={class:"d-flex flex-column h-100"},S={class:"h3 mb-2"},j={class:"text-muted mb-3"},D={class:"text-primary mb-4"},N={class:"d-flex justify-content-start"},V={class:"mt-5"},F={key:0},G={key:1},M={class:"mt-3 d-flex justify-content-between gap-5"},A={class:"flex-fill"},E={key:0},L={class:"text-muted"},I={key:1},U={class:"flex-fill"},X={class:"mb-3"};function z(a,o,H,J,n,r){return l(),i("div",x,[t("div",_,[t("button",{class:"btn btn-outline-dark",onClick:o[0]||(o[0]=(...e)=>r.goBack&&r.goBack(...e))}," << Trở lại ")]),t("div",C,[t("div",w,[t("img",{src:n.book.anhbia,alt:"Book Cover",class:"img-fluid rounded shadow-sm",style:{"object-fit":"cover",height:"320px"}},null,8,B)]),t("div",T,[t("div",q,[t("h1",S,s(n.book.tensach),1),t("h4",j,"by "+s(n.book.tacgia),1),t("h5",D,"đ"+s(n.book.dongia),1),t("div",null,[t("p",null,[o[4]||(o[4]=t("strong",null,"Nhà xuất bản:",-1)),d(" "+s(n.book.nxb.tennxb),1)]),t("p",null,[o[5]||(o[5]=t("strong",null,"Địa chỉ:",-1)),d(" "+s(n.book.nxb.diachi),1)])]),t("div",null,[t("p",null,[o[6]||(o[6]=t("strong",null,"Xuất bản năm:",-1)),d(" "+s(n.book.namxuatban),1)]),t("p",null,[o[7]||(o[7]=t("strong",null,"Số lượng:",-1)),d(" "+s(n.book.soquyen),1)])]),t("div",N,[t("button",{class:"btn btn-primary",onClick:o[1]||(o[1]=e=>r.addBookToCart(n.book))}," Thêm vào giỏ mượn ")]),o[8]||(o[8]=h('<div class="mt-4" data-v-f3507bd7><button class="btn btn-outline-primary me-2" data-v-f3507bd7><i class="bi bi-facebook" data-v-f3507bd7></i> Chia sẻ trên Facebook </button><button class="btn btn-outline-info" data-v-f3507bd7><i class="bi bi-twitter" data-v-f3507bd7></i> Chia sẻ trên Twitter </button></div>',1))])])]),t("div",V,[o[9]||(o[9]=t("h5",{class:"mb-2"},"Mô tả",-1)),n.book.mota?(l(),i("p",F,s(n.book.mota),1)):(l(),i("p",G,"Chưa có mô tả nào cho quyển sách này."))]),t("div",M,[t("div",A,[o[11]||(o[11]=t("h5",{class:"mb-4"},"Bình luận đánh giá từ người đọc",-1)),n.book.binhluan&&n.book.binhluan.length>0?(l(),i("div",E,[(l(!0),i(k,null,f(n.book.binhluan,(e,b)=>(l(),i("div",{key:b,class:"mb-3 border-bottom"},[t("p",null,[t("strong",null,s(e.customer),1),o[10]||(o[10]=d(" - ")),t("span",L,s(e.date),1)]),t("p",null,s(e.comment),1)]))),128))])):(l(),i("p",I,"Chưa có bình luận đánh giá nào cho quyển sách này."))]),t("div",U,[t("form",{onSubmit:o[3]||(o[3]=g((...e)=>r.submitComment&&r.submitComment(...e),["prevent"]))},[t("div",X,[o[12]||(o[12]=t("label",{for:"commentText",class:"form-label"},"Bình luận của bạn",-1)),p(t("textarea",{id:"commentText","onUpdate:modelValue":o[2]||(o[2]=e=>n.newComment.comment=e),class:"form-control",rows:"4",placeholder:"Chia sẻ cảm nhận của bạn về quyển sách này",required:""},null,512),[[v,n.newComment.comment]])]),o[13]||(o[13]=t("button",{type:"submit",class:"btn btn-primary"}," Gửi bình luận ",-1))],32)])])])}const P=u(y,[["render",z],["__scopeId","data-v-f3507bd7"]]);export{P as default};
