import{c as C,a as p,b as x}from"./index.esm-BQ_k1baG.js";import{b as _}from"./book.service-BUwmwyft.js";import{_ as w,o as n,c as a,a as r,b as u,d as c,F as V,r as E,t as h,w as m,v as y,e as f,f as v,g as k}from"./index-HVgC_N1k.js";import{P as q}from"./Pagination-nkm2KgxR.js";const P={name:"BookTable",props:{books:Array},data(){return{sortBy:"",sortOrder:"asc",editBook:null}},computed:{sortedBooks(){return this.books.slice().sort((t,e)=>{const d=this.getNestedValue(t,this.sortBy),g=this.getNestedValue(e,this.sortBy);return d===g?0:this.sortOrder==="asc"?d<g?-1:1:d<g?1:-1})}},methods:{sortTable(t){this.sortBy===t?this.sortOrder=this.sortOrder==="asc"?"desc":"asc":(this.sortBy=t,this.sortOrder="asc")},getNestedValue(t,e){return e.split(".").reduce((d,g)=>d&&d[g],t)},formattedPrice(t){return new Intl.NumberFormat("en-US",{style:"currency",currency:"VND"}).format(t)},async toggleEdit(t){if(t.isEditing)try{const e={masach:t.masach,tensach:t.tensach,tacgia:t.tacgia,dongia:t.dongia,soquyen:t.soquyen,namxuatban:t.namxuatban,tennxb:t.nxb.tennxb,diachi:t.nxb.diachi};await this.saveBook(e)}catch(e){console.error("Error saving book",e),alert("Failed to save book data.")}else t.originalData={...t};t.isEditing=!t.isEditing},getValidationSchema(){return C({tensach:p().required("Tên sách không được để trống"),tacgia:p().required("Tác giả không được để trống"),dongia:x().positive("Đơn giá phải là số dương").required("Đơn giá không được để trống"),soquyen:x().integer("Số quyển phải là số nguyên").required("Số quyển không được để trống"),namxuatban:x().min(1e3,"Năm xuất bản phải lớn hơn hoặc bằng 1000").max(new Date().getFullYear(),`Năm xuất bản không thể lớn hơn ${new Date().getFullYear()}`).required("Năm xuất bản không được để trống"),tennxb:p().required("Tên nhà xuất bản không được để trống"),diachi:p().required("Địa chỉ nhà xuất bản không được để trống")})},async saveBook(t){try{await this.getValidationSchema().validate(t,{abortEarly:!1});const e=await _.update(t.masach,t);alert(`Cập nhật thành công cho: ${e.book.tensach}`)}catch(e){if(e.name==="ValidationError"){const d=e.errors.join(`
`);alert(`Có lỗi xảy ra trong dữ liệu:
${d}`)}else this.$emit("reload-books"),e.response&&e.response.data&&e.response.data.message?alert(e.response.data.message):alert("Có lỗi xảy ra. Vui lòng thử lại.");this.$emit("reload-books")}},cancelEdit(t){Object.assign(t,t.originalData),t.isEditing=!1},deleteBook(t){confirm(`Xác nhận muốn xóa ${t.tensach}?`)&&_.delete(t.masach).then(()=>{alert(`Sách ${t.tensach} được xóa thành công!`),this.$emit("reload-books")}).catch(e=>{console.error("Có lỗi khi xóa sách:",e)})}}},T={class:"table"},N={key:0},U={key:0,class:"fa fa-arrow-up"},O={key:1,class:"fa fa-arrow-down"},S={key:0},A={key:0,class:"fa fa-arrow-up"},D={key:1,class:"fa fa-arrow-down"},F={key:0},R={key:0,class:"fa fa-arrow-up"},I={key:1,class:"fa fa-arrow-down"},X={key:0},z={key:0,class:"fa fa-arrow-up"},L={key:1,class:"fa fa-arrow-down"},M={key:0},Y={key:0,class:"fa fa-arrow-up"},j={key:1,class:"fa fa-arrow-down"},H={key:0},K={key:0,class:"fa fa-arrow-up"},Q={key:1,class:"fa fa-arrow-down"},G={key:0},J={key:0,class:"fa fa-arrow-up"},W={key:1,class:"fa fa-arrow-down"},Z={key:0},$=["title"],ee=["onUpdate:modelValue"],te={key:0},se=["onUpdate:modelValue"],ne={key:0},ae=["onUpdate:modelValue"],re={key:0},oe=["onUpdate:modelValue"],ie={key:0},le=["onUpdate:modelValue"],de={key:0},ce=["onUpdate:modelValue"],ue={key:0},he=["onUpdate:modelValue"],ge=["onClick"],me=["onClick"],ye=["onClick"];function pe(t,e,d,g,l,o){const b=k("router-link");return n(),a("table",T,[r("thead",null,[r("tr",null,[r("th",{onClick:e[0]||(e[0]=s=>o.sortTable("tensach"))},[e[7]||(e[7]=u(" Tên sách ")),l.sortBy==="tensach"?(n(),a("span",N,[l.sortOrder==="asc"?(n(),a("i",U)):(n(),a("i",O))])):c("",!0)]),r("th",{onClick:e[1]||(e[1]=s=>o.sortTable("tacgia"))},[e[8]||(e[8]=u(" Tác giả ")),l.sortBy==="tacgia"?(n(),a("span",S,[l.sortOrder==="asc"?(n(),a("i",A)):(n(),a("i",D))])):c("",!0)]),r("th",{onClick:e[2]||(e[2]=s=>o.sortTable("dongia"))},[e[9]||(e[9]=u(" Đơn giá ")),l.sortBy==="dongia"?(n(),a("span",F,[l.sortOrder==="asc"?(n(),a("i",R)):(n(),a("i",I))])):c("",!0)]),r("th",{onClick:e[3]||(e[3]=s=>o.sortTable("soquyen"))},[e[10]||(e[10]=u(" Số quyển ")),l.sortBy==="soquyen"?(n(),a("span",X,[l.sortOrder==="asc"?(n(),a("i",z)):(n(),a("i",L))])):c("",!0)]),r("th",{onClick:e[4]||(e[4]=s=>o.sortTable("namxuatban"))},[e[11]||(e[11]=u(" Năm xuất bản ")),l.sortBy==="namxuatban"?(n(),a("span",M,[l.sortOrder==="asc"?(n(),a("i",Y)):(n(),a("i",j))])):c("",!0)]),r("th",{onClick:e[5]||(e[5]=s=>o.sortTable("nxb.tennxb"))},[e[12]||(e[12]=u(" Nhà xuất bản ")),l.sortBy==="nxb.tennxb"?(n(),a("span",H,[l.sortOrder==="asc"?(n(),a("i",K)):(n(),a("i",Q))])):c("",!0)]),r("th",{onClick:e[6]||(e[6]=s=>o.sortTable("nxb.diachi"))},[e[13]||(e[13]=u(" Địa chỉ NXB ")),l.sortBy==="nxb.diachi"?(n(),a("span",G,[l.sortOrder==="asc"?(n(),a("i",J)):(n(),a("i",W))])):c("",!0)]),e[14]||(e[14]=r("th",null,null,-1)),e[15]||(e[15]=r("th",null,null,-1))])]),r("tbody",null,[o.sortedBooks.length===0?(n(),a("tr",Z,e[16]||(e[16]=[r("td",{colspan:"8",class:"text-center"}," Không có dữ liệu sách nào! ",-1)]))):c("",!0),(n(!0),a(V,null,E(o.sortedBooks,(s,B)=>(n(),a("tr",{key:s.masach},[r("td",null,[s.isEditing?m((n(),a("input",{key:1,"onUpdate:modelValue":i=>s.tensach=i,class:"editable"},null,8,ee)),[[y,s.tensach]]):(n(),a("span",{key:0,title:s.tensach},h(s.tensach),9,$))]),r("td",null,[s.isEditing?m((n(),a("input",{key:1,"onUpdate:modelValue":i=>s.tacgia=i,class:"editable"},null,8,se)),[[y,s.tacgia]]):(n(),a("span",te,h(s.tacgia),1))]),r("td",null,[s.isEditing?m((n(),a("input",{key:1,"onUpdate:modelValue":i=>s.dongia=i,type:"number",class:"editable"},null,8,ae)),[[y,s.dongia]]):(n(),a("span",ne,h(o.formattedPrice(s.dongia)),1))]),r("td",null,[s.isEditing?m((n(),a("input",{key:1,"onUpdate:modelValue":i=>s.soquyen=i,type:"number",class:"editable"},null,8,oe)),[[y,s.soquyen]]):(n(),a("span",re,h(s.soquyen),1))]),r("td",null,[s.isEditing?m((n(),a("input",{key:1,"onUpdate:modelValue":i=>s.namxuatban=i,type:"number",class:"editable"},null,8,le)),[[y,s.namxuatban]]):(n(),a("span",ie,h(s.namxuatban),1))]),r("td",null,[s.isEditing?m((n(),a("input",{key:1,"onUpdate:modelValue":i=>s.nxb.tennxb=i,class:"editable"},null,8,ce)),[[y,s.nxb.tennxb]]):(n(),a("span",de,h(s.nxb.tennxb),1))]),r("td",null,[s.isEditing?m((n(),a("input",{key:1,"onUpdate:modelValue":i=>s.nxb.diachi=i,class:"editable"},null,8,he)),[[y,s.nxb.diachi]]):(n(),a("span",ue,h(s.nxb.diachi),1))]),r("td",null,[r("button",{class:"btn btn-success",onClick:i=>o.toggleEdit(s)},h(s.isEditing?"Lưu":"Sửa nhanh"),9,ge),s.isEditing?(n(),a("button",{key:0,class:"btn btn-secondary",onClick:i=>o.cancelEdit(s)}," Hủy ",8,me)):c("",!0),s.isEditing?c("",!0):(n(),a("button",{key:1,class:"btn btn-danger",onClick:i=>o.deleteBook(s)}," Xóa ",8,ye))]),r("td",null,[f(b,{to:{name:"edit-book",params:{id:s.masach}},class:"btn btn-info"},{default:v(()=>e[17]||(e[17]=[u(" Sửa ")])),_:2},1032,["to"])])]))),128))])])}const fe=w(P,[["render",pe],["__scopeId","data-v-7259ef75"]]),ke={name:"Books",props:{page:{type:Number,required:!0},limit:{type:Number,required:!0}},components:{BookTable:fe,Pagination:q},created(){this.fetchBooks(this.page,this.limit)},data(){return{books:[],currentPage:this.page,totalPages:1}},watch:{page(t){this.fetchBooks(t,this.limit)},limit(t){this.fetchBooks(this.page,t)}},methods:{async fetchBooks(t=1,e=8){try{const d=await _.getAll({page:t,limit:e});this.books=d.books,this.totalPages=d.pagination.totalPages,this.currentPage=t}catch(d){console.error("Error fetching books:",d)}},handlePageChange(t){this.updateRoute(t)},updateRoute(t){this.$router.push({query:{...this.$route.query,page:t}})},reloadBooks(){this.fetchBooks(this.currentPage)},async deleteAllBooks(){if(window.confirm("Are you sure you want to delete all books?"))try{await _.deleteAll(),this.books=[],alert("All books have been deleted.")}catch(e){console.error("Error deleting books:",e),alert("There was an error deleting all books.")}else alert("Delete operation was canceled.")}}},_e={class:"book-management"},be={class:"header"},xe={class:"d-flex"};function Be(t,e,d,g,l,o){const b=k("router-link"),s=k("BookTable"),B=k("Pagination");return n(),a("div",_e,[r("div",be,[r("div",xe,[e[3]||(e[3]=r("h2",null,"Quản lý sách",-1)),r("button",{onClick:e[0]||(e[0]=(...i)=>o.reloadBooks&&o.reloadBooks(...i)),class:"reload-btn"},e[2]||(e[2]=[r("i",{class:"fa fa-sync-alt"},null,-1)]))]),f(b,{to:{name:"create-book"},class:"btn btn-dark"},{default:v(()=>e[4]||(e[4]=[r("i",{class:"fa fa-plus"},null,-1),u(" Thêm mới ")])),_:1})]),f(s,{books:l.books,onReloadBooks:o.reloadBooks},null,8,["books","onReloadBooks"]),f(B,{currentPage:l.currentPage,totalPages:l.totalPages,pageSize:d.limit,onPageChanged:o.handlePageChange},null,8,["currentPage","totalPages","pageSize","onPageChanged"]),r("button",{onClick:e[1]||(e[1]=(...i)=>o.deleteAllBooks&&o.deleteAllBooks(...i)),class:"delete-all-btn"},e[5]||(e[5]=[r("i",{class:"fa fa-trash"},null,-1)]))])}const Ee=w(ke,[["render",Be],["__scopeId","data-v-73244128"]]);export{Ee as default};
