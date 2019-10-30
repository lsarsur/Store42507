/* Template Fastcommerce [02/2019] */

var iNextPageButFC,bBuyWishlist,iDescontoAvista,Juros=[];

/* Translate texts */
function rk(sKey){if(oResources[sKey])return oResources[sKey];else console.warn("js var not found in language resources %c"+ sKey,"color:red");}

var sF$=(function(){
 
  var sCurrentPage=document.location.href.toUpperCase();

  /* Translate texts Inputs and Aria-labels */
  function execLangResource(){
    var oFooterNewsletterInput=document.getElementById("footer-newsletter-box-text");
    if(oFooterNewsletterInput)oFooterNewsletterInput.placeholder=rk("footer-section-newsletter-text-input");
    if(oFooterNewsletterInput)oFooterNewsletterInput.setAttribute("aria-label",rk("footer-section-newsletter-text-input"));
    
    var oHeaderAutoSuggestInput=document.getElementById("autocomplete");
    if(oHeaderAutoSuggestInput)oHeaderAutoSuggestInput.placeholder=rk("header-autosuggest-input");
    if(oHeaderAutoSuggestInput)oHeaderAutoSuggestInput.setAttribute("aria-label",rk("header-autosuggest-input"));    
    
    var oCartZipCodeButton=document.getElementById("idZipC1button"); 
    if(oCartZipCodeButton)oCartZipCodeButton.value=rk("cart-zip-code-button");

    var oShoppingListTextArea=document.getElementById("productListArea");
    if(oShoppingListTextArea)oShoppingListTextArea.placeholder=rk("shopping-list-one-product-line");
    
    var oHeaderCatMenuClose=document.getElementById("header-cat-menu-close");
    if(oHeaderCatMenuClose)oHeaderCatMenuClose.alt=rk("header-cat-menu-close");

    var oHeaderMainbarContainerSearchIcon=document.getElementById("header-mainbar-container-search-icon");
    if(oHeaderMainbarContainerSearchIcon)oHeaderMainbarContainerSearchIcon.alt=rk("header-mainbar-container-search-icon");
    
    var oHeaderCatCart=document.getElementById("header-cat-cart");
    if(oHeaderCatCart)oHeaderCatCart.alt=rk("header-cat-cart");    

    var oHeaderCatSearchClose=document.getElementById("header-cat-search-close");
    if(oHeaderCatSearchClose)oHeaderCatSearchClose.alt=rk("header-cat-search-close");   
    
    var oHeaderVoiceSearchMGlass=document.getElementById("voiceSearchMGlass");
    if(oHeaderVoiceSearchMGlass)oHeaderVoiceSearchMGlass.alt=rk("header-voice-search-mglass");      
 
    var oHomeTitleSalesDesktop=document.getElementById("home-title-sales-desktop");
    if(oHomeTitleSalesDesktop)oHomeTitleSalesDesktop.alt=rk("home-title-sales");         

    var oHomeTitleSalesMobile=document.getElementById("home-title-sales-mobile");
    if(oHomeTitleSalesMobile)oHomeTitleSalesMobile.alt=rk("home-title-sales");  

    var oHomeTitleLastReleasesDekstop=document.getElementById("home-title-last-releases-dekstop");
    if(oHomeTitleLastReleasesDekstop)oHomeTitleLastReleasesDekstop.alt=rk("home-title-last-releases");

    var oHomeTitleLastReleasesMobile=document.getElementById("home-title-last-releases-mobile");
    if(oHomeTitleLastReleasesMobile)oHomeTitleLastReleasesMobile.alt=rk("home-title-last-releases");

    var oHomeSectionPayment=document.getElementById("home-section-payment");
    if(oHomeSectionPayment)oHomeSectionPayment.alt=rk("home-section-payment");

    var oHomeSectionSecurity=document.getElementById("home-section-security");
    if(oHomeSectionSecurity)oHomeSectionSecurity.alt=rk("home-section-security");

    var oHomeSectionDelivery=document.getElementById("home-section-delivery");
    if(oHomeSectionDelivery)oHomeSectionDelivery.alt=rk("home-section-delivery");

    var oHomeSectionContactUS=document.getElementById("home-section-contact-us");
    if(oHomeSectionContactUS)oHomeSectionContactUS.alt=rk("home-section-contact-us");

    var oFooterNewsletterSubmitButton=document.getElementById("footer-newsletter-submit-button");
    if(oFooterNewsletterSubmitButton)oFooterNewsletterSubmitButton.alt=rk("footer-newsletter-submit-button");
    
    var oListFiltersClose=document.getElementById("list-filters-close");
    if(oListFiltersClose)oListFiltersClose.alt=rk("list-filters-close");    
  }

  function fnGetID(id){return document.getElementById(id);}

  function fnGetConfig(configItem){return ((oStoreConfig$[configItem] instanceof Array)?oStoreConfig$[configItem][0]:oStoreConfig$[configItem]);}

  /* Function that preload images */
  function fnPreloadImages() {
    var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=fnPreloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
  }
 
  function fnFormatNumber(num){
    num=num.toString().replace(/\$|\,/g,'');
    if(isNaN(num))num="0";
    sign=(num==(num=Math.abs(num)));
    num=Math.floor(num*100+0.50000000001);
    num=Math.floor(num/100).toString();
    for(var i=0;i<Math.floor((num.length-(1+i))/3);i++)num=num.substring(0,num.length-(4*i+3))+'.'+num.substring(num.length-(4*i+3));
    return ((sign)?'':'-')+num;
  }
  
  function fnLogout(){
    if(FC$.ClientID!=0){
      var oLinkLogin=fnGetID("idLinkLoginFC");
      if(oLinkLogin){
        oLinkLogin.innerHTML=rk("footer-section-title-logout");
        oLinkLogin.href=FCLib$.uk("url-register")+"?logoff=true";
      }
    }
  }

  var iPL=0;
  
  function fnShowProd(Price,OriginalPrice,Cod,iMaxParcels,ProductID){
    /* Function that shows the price of the product, installment payment, cash discount and badge (home and list) */
    iPL++;
    var idPrice=fnGetID("idProdPrice"+ProductID);
    var sPrice="";
    if(Price==0 && OriginalPrice==0){
      if(idPrice)idPrice.innerHTML="<div class=\"prices\"><br><div class=\"price font-bold\"><div class=currency><a href='"+ FCLib$.uk("url-contact") +"?"+ (rk("topic-query-product-subject") +"="+ rk("topic-query-product-about") +" ("+ rk("topic-query-product-code") +" ").replace((/ /g,"%20")) + Cod +")' target='_top' >"+ rk("list-price-call-us") +"</a></div></div></div>";
      return void(0);
    }
    var iPrice=Price.toString().split(".");
    if(iPrice.length==2){
      var iPriceInt=iPrice[0];
      var PriceDecimal=iPrice[1];
      if(PriceDecimal.length==1)PriceDecimal+="0";
    }
    else{
      var iPriceInt=iPrice;
      var PriceDecimal="00";
    }    
    /* Installment */
    var sInterest;
    if(typeof Juros!="undefined"){
      if(iMaxParcels==0||iMaxParcels>Juros.length)iMaxParcels=Juros.length;
      if(Juros[iMaxParcels-1]>0)sInterest=""; else sInterest=" <span class='home-price-breakline'>"+ rk("list-price-no-interest") +"</span>";
    }
    else{
      iMaxParcels=0;
    }
    if(Price!=OriginalPrice){
      sPrice+="<div class=\"prices\">";
      sPrice+="  <div class=\"old-price font-regular\">"+ rk("list-price-was") +"&nbsp; <span>"+ FCLib$.formatMoney(OriginalPrice,FC$.Currency) +"</span></div>";
      sPrice+="  <div class=\"price home-price font-bold\"><span class=\"home-price-por\">"+ rk("list-price-now") +" </span>"+ FC$.Currency + " " + FCLib$.formatMoneyInt(iPriceInt) + FCLib$.getDecimalSep() + "<span class=\"home-price-cents\">" + PriceDecimal + "</span>" +"</div>";
      if(iMaxParcels>1)sPrice+="  <div class=\"installments font-regular\"><strong><span class=\"installment-count\">"+ iMaxParcels +"</span>x</strong> <strong><span class=\"installment-price\">"+ FCLib$.formatMoney(CalculaParcelaJurosCompostos(Price,iMaxParcels),FC$.Currency) +"</span></strong>"+ sInterest +"</div>";
      sPrice+="</div>";
    }
    else{
      sPrice+="<div class=\"prices\">";
      sPrice+="  <div class=\"price home-price font-bold\">"+ FC$.Currency + " " + FCLib$.formatMoneyInt(iPriceInt) + FCLib$.getDecimalSep() + "<span class=\"home-price-cents\">" + PriceDecimal + "</span>" +"</div>";
      if(iMaxParcels>1)sPrice+="  <div class=\"installments font-regular\"><strong><span class=\"installment-count\">"+ iMaxParcels +"</span>x</strong> <strong><span class=\"installment-price\">"+ FCLib$.formatMoney(CalculaParcelaJurosCompostos(Price,iMaxParcels),FC$.Currency) +"</span></strong>"+ sInterest +"</div>";
      sPrice+="</div>";
    }
    if(idPrice)idPrice.innerHTML=sPrice;
    /* Discount */
    if(Price>0 && iDescontoAvista>0){
      var oProdDesc=document.getElementById("ProdDesc"+ ProductID);
      if(oProdDesc)oProdDesc.innerHTML=""+ rk("price-in-cash") +" <b>"+ FCLib$.formatMoney(Price*((100-iDescontoAvista)/100),FC$.Currency)+ "</b>";
    }
    /* Badge */
    var oBadge=document.getElementById("DivProd"+ProductID);
    if(oBadge){
      if(fnGetConfig("Product_Badges_Home_ProductList")){
        var sBadges="";
        if(oBadge.hasAttribute("data-sale") && OriginalPrice>Price)sBadges+="<div id='badgeProm"+ ProductID +"' class='fc-badge-product-sale' title='Oferta'><span>-" + fnGetSale() + "%</span></div>";
        /* if(oBadge.hasAttribute("data-release"))sBadges+="<div class='fc-badge-product-release' title='Lançamento'>&#10033;</div>"; */
        /* if(oBadge.hasAttribute("data-highlight"))sBadges+="<div class='fc-badge-product-highlight' title='Destaque'>&#9755;</div>"; */
        if(sBadges!="")oBadge.innerHTML+="<div class='fc-badge-product-principal'>"+ sBadges +"</div>";
      }
      function fnGetSale(){return parseInt((OriginalPrice-Price)/OriginalPrice*100);}
    }
  }

  function fnShowButtonCart(Estoque, IDProd){
    var idButton=document.querySelector('#idButtonProd'+ IDProd +' img');
    var idAviso=document.querySelector('#idAvisoProd'+ IDProd +'');
    var avisoDisp='<span class="mntext"><a href="#na" onclick="sF$.fnShowDisp('+ IDProd +');">'+ rk("button-cart-warn-me") +'</a> '+ rk("button-cart-warn-me-when-available") +'</span>';
    if (idButton){
      if(Estoque==0){
        idButton.setAttribute('src',''+ FC$.PathImg +'botcarrinhoesgotado.svg?cccfc=1');
        idAviso.innerHTML=avisoDisp;
      }else{
        idButton.setAttribute('src',''+ FC$.PathImg +'botcarrinho.svg?cccfc=1');
      }
    } 
  }

  function fnShowDisp(IDProd){
    popup=window.open(FCLib$.uk("url-product-availability") +"?"+ (FCLib$.fnUseEHC()?"productid":"idproduto") +"="+ IDProd,"Disp","top=10,left=10,height=480,width=450,scrollbars=yes");
    popup.focus();
    return void(0);
  }

  function fnSearchSubmit(oForm){
    var oSearch=(FCLib$.fnUseEHC()?oForm.text:oForm.texto);
    if(oSearch){
      var sSearch=oSearch.value;
      if(sSearch.length<2){
        alert(""+ rk("form-submit-search-correctly") +"");
        oSearch.focus();
       }
       else{
        document.TopSearchForm.submit()
       }
    }
  }
  
  function fnCustomizeIconsSocialNetworks(isProd){
    /* If isProd customize product detail icons, otherwise footer */
    if(isProd)var oContentHTML=document.getElementById("idShareProd");
    else var oContentHTML=document.getElementById("idShareFooter");
    if(oContentHTML)var aImgsShare=oContentHTML.getElementsByTagName('img');
    if(aImgsShare)
      for(var i=0;i<aImgsShare.length;i++){
        if(aImgsShare[i].className=='EstImgShareFacebook'){
          aImgsShare[i].setAttribute('data-src',FC$.PathImg +'iconprodfacebook.svg?cccfc=1');
          aImgsShare[i].src=FC$.PathImg +'iconprodfacebook.svg?cccfc=1';
        }
        else if(aImgsShare[i].className=='EstImgShareTwitter'){
          aImgsShare[i].setAttribute('data-src',FC$.PathImg +'iconprodtwitter.svg?cccfc=1');
          aImgsShare[i].src=FC$.PathImg+ 'iconprodtwitter.svg?cccfc=1';
        }
        else if(aImgsShare[i].className=='EstImgShareGooglePlus'){
          aImgsShare[i].setAttribute('data-src',FC$.PathImg +'iconprodgoogleplus.svg?cccfc=1');
          aImgsShare[i].src=FC$.PathImg+ 'iconprodgoogleplus.svg?cccfc=1';
        }
        else if(aImgsShare[i].className=='EstImgSharePinterest'){
          aImgsShare[i].setAttribute('data-src',FC$.PathImg +'iconprodpinterest.svg?cccfc=1');
          aImgsShare[i].src=FC$.PathImg+ 'iconprodpinterest.svg?cccfc=1';
        }
        if(isProd){/* Product */
          aImgsShare[i].style.width="30px";
          aImgsShare[i].style.height="33px";
          aImgsShare[i].setAttribute("alt","Social Media");
        }
        else{/* Footer */
          aImgsShare[i].style.width="43px";
          aImgsShare[i].style.height="43px";
          aImgsShare[i].setAttribute("alt","Social Media");
        }
    }
  }
  
  function fnShowCart(bShow,ItensCesta){
   oTabItensCart=document.getElementById('TabItensCart');
   if(bShow){
      oTabItensCart.className="EstTabItensCartOn";
      document.getElementById('DivItensCart').style.display="";
    }
   else{
      oTabItensCart.className="EstTabItensCart";
      document.getElementById('DivItensCart').style.display="none";
    }
  }
  
  function fnGoCart(){
    document.location.href=FCLib$.uk("url-add-product");
  }

  function fnUpdateCart(IsAdd,IsSpy){FCLib$.fnAjaxExecFC(FCLib$.uk("url-xml-cart"),"",false,fnCallbackUpdateCart,IsAdd,IsSpy);}

  function fnCallbackUpdateCart(oHTTP,IsAdd,IsSpy){
    if(oHTTP.responseXML){
      oXML=oHTTP.responseXML;
      var oCarts=oXML.getElementsByTagName("cart");
      try{currencyProdCart=(oCarts[0].getElementsByTagName("currency")[0].childNodes[0].nodeValue);}catch(e){currencyProdCart=FC$.Currency}
      try{TotalQtyProdCart=(oCarts[0].getElementsByTagName("TotalQty")[0].childNodes[0].nodeValue);}catch(e){TotalQtyProdCart="0"}
      try{subtotalProdCart=(oCarts[0].getElementsByTagName("subtotal")[0].childNodes[0].nodeValue);}catch(e){subtotalProdCart="0,00"}
      iItensCesta=TotalQtyProdCart;
      if(IsSpy){
        var oReferrer=window.parent;
        try{oReferrer.document.getElementById("idCartItemsTop").innerHTML=iItensCesta;}catch(e){}
        try{oReferrer.document.getElementById("idCartItemsToolTop").innerHTML=iItensCesta;}catch(e){}
        try{oReferrer.document.getElementById("idCartTotalTop").innerHTML=FCLib$.FormatPreco(currencyProdCart +" "+ subtotalProdCart);}catch(e){}
        try{oReferrer.document.getElementById("idCartTotalToolTop").innerHTML=FCLib$.FormatPreco(currencyProdCart +" "+ subtotalProdCart);}catch(e){}
      }
      else {
        try{document.getElementById("idCartItemsTop").innerHTML=iItensCesta;}catch(e){}
        try{document.getElementById("idCartItemsToolTop").innerHTML=iItensCesta;}catch(e){}
        try{document.getElementById("idCartTotalTop").innerHTML=FCLib$.FormatPreco(currencyProdCart +" "+ subtotalProdCart);}catch(e){}
        try{document.getElementById("idCartTotalToolTop").innerHTML=FCLib$.FormatPreco(currencyProdCart +" "+ subtotalProdCart);}catch(e){}
      }
    }
  }

  /* Personal history */
  function fnLoadXMLPageHistory(){FCLib$.fnAjaxExecFC(FCLib$.uk("url-xml-page-history"),"",false,fnCallbackLoadXMLPageHistory);}

  function fnCallbackLoadXMLPageHistory(oHTTP){
    if(oHTTP.responseXML){
      var oXML=oHTTP.responseXML;
      var aItens=oXML.getElementsByTagName("item")
      if(aItens)sF$.fnShowPageHistory(aItens);
    }
  }
  
  function fnShowPageHistory(oHistoryPages){
    if(fnGetConfig("History_Page")){
      var oPageHistory=document.getElementById("idPageHistory");
      if(oPageHistory){
        var sPageHistory="";
        try{var sBar=(oHistoryPages[0].getElementsByTagName("title")[0].childNodes[0].nodeValue);}
        catch(e){var sBar="";}
        if(sBar!=""){sPageHistory+="<div id='idDivPageHistory'><div id='idPageHistoryFC'><div id='idTitPageHistory'><h3>"+ rk("footer-history-title") +"</h3></div><ul id='idListPageHistoryFC'>";}  
        for (i=0;i<oHistoryPages.length;i++){
          sTitleProd=oHistoryPages[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
          sLinkProd=oHistoryPages[i].getElementsByTagName("link")[0].childNodes[0].nodeValue;
          try{sImageProd=oHistoryPages[i].getElementsByTagName("image")[0].childNodes[0].nodeValue;}
          catch(e){sImageProd=FC$.PathImg+"nd0.gif";}
          try{sPriceProd=(oHistoryPages[i].getElementsByTagName("price")[0].childNodes[0].nodeValue);}
          catch(e){sPriceProd="";}
          sTitleProd=sTitleProd.substring(0,20);         
          var nPriceSpace = 3;
          var sPlitPrice = sPriceProd.split(' ');
          var sPriceFirstLine = sPlitPrice.slice(0, nPriceSpace).join(' ');
          var sPriceSecondLine = sPlitPrice.slice(nPriceSpace).join(' ');      
          sPageHistory+="<li>";
          sPageHistory+="<div class='EstImagePageHistory'><a href='"+ sLinkProd +"'><img data-src='"+ sImageProd +"' alt='"+ sTitleProd +"' border=0 class=EstFotoPageHistory onError=MostraImgOnError(this,0)></a></div>";
          sPageHistory+="<div class='EstNamePageHistory'><a href='"+ sLinkProd +"'>"+ sTitleProd +"</a></div>";
          sPageHistory+="<div class=EstPricePageHistory>"+ sPriceFirstLine +" <br>"+ sPriceSecondLine +"</div>";
          sPageHistory+="</li>";
        }
        oPageHistory.innerHTML=sPageHistory+"</ul></div></div>";
      }
    }
  }

  function fnInsertVideo(ProductID,CodVideo){
    var oVideo=document.getElementById("VideoProd"+ProductID);
    if(oVideo){
      oVideo.innerHTML="<iframe class=\"VideoProd\" src=\"//www.youtube.com/embed/"+ CodVideo +"?controls=1&showinfo=0&rel=0&modestbranding=1&theme=light&modestbranding=1\" frameborder=0 allowfullscreen></iframe>"
    }
  }
  
  function fnAdjustsFilters(){ 
    var bTemPathQts=false;
    var oUlPathCatQt=document.getElementById("idUlPathCatQtFC");
    if(oUlPathCatQt){bTemPathQts=true;}else{document.getElementById('idListaProdCategoriasFC').style.display='none';}
    var oUlAdic1Qt=document.getElementById("idUlAdic1QtFC");
    if(oUlAdic1Qt){bTemPathQts=true;}else{document.getElementById('idListaProdAdicional1FC').style.display='none';}
    var oUlAdic2Qt=document.getElementById("idUlAdic2QtFC");
    if(oUlAdic2Qt){bTemPathQts=true;}else{document.getElementById('idListaProdAdicional2FC').style.display='none';}
    var oUlAdic3Qt=document.getElementById("idUlAdic3QtFC");
    if(oUlAdic3Qt){bTemPathQts=true;}else{document.getElementById('idListaProdAdicional3FC').style.display='none';}
    /* If don't have products in the categories, remove div */
    if(!bTemPathQts)document.getElementById("idDivPath").style.display='none';
    /* If don't have any search filters, remove div with filters */
    var oUlPathSearch=document.getElementById("idUlPathSearchFC");
    if(oUlPathSearch==null)document.getElementById("idDivSearch").style.display='none';
  }

  function fnLoginUserName(NameUser,PicUser){
    var oImgGlobalSign=document.getElementById("idImgGlobalSignFC");
    if(NameUser==""){
      document.getElementById('fc-loginInfo').innerHTML = "<a href='"+ FCLib$.uk("url-register") +"?pp=3&passo=1&sit=1'><img src="+ FC$.PathImg +"iconuser.svg width='30' height='30'></a>";
      if(oImgGlobalSign){oImgGlobalSign.style.display="";}
    }
    else{
      NameUser=fnFirstName(NameUser);
      document.getElementById('fc-loginInfo').innerHTML = "<a href='#Logout' onclick=FCLib$.fnClientLogout('',sF$.fnCliLogout)><span class='HeaderSocialLoginLogout'><img src="+ FC$.PathImg +"iconuser-off.svg width='30' height='30'></span></a>";
      if(oImgGlobalSign){oImgGlobalSign.style.display="none";}
    }
    var oFoto=document.getElementById("UserImage");
    if(oFoto){
      if(PicUser==undefined || PicUser==""){oFoto.src=FC$.PathImg+"iconuser.svg?cccfc=1";}
      else{oFoto.src=PicUser;}   
    } 
  }
 
  function fnFirstName(NameUser){
    var iPos=NameUser.search(" ");
    if(iPos>0) return NameUser.charAt(0).toUpperCase() + NameUser.substring(0,iPos).slice(1).toLowerCase();
    else return NameUser.charAt(0).toUpperCase() + NameUser.slice(1).toLowerCase();
  }

  function fnCliLogout(obj,sPag){
    sF$.fnLoginUserName("","");
    FC$.ClientID==0;
    fnShowGlobalSignin();
  }
  
  function fnMostraDescontoProdDet(PrecoProd){
    if(PrecoProd==0 || iDescontoAvista==0)return;
    document.getElementById("idPriceAVista").innerHTML="<div id='PriceAVista'><p>"+ rk("show-for-cash-payments-text") +" <b>"+ iDescontoAvista +""+ rk("show-for-cash-payments-discount-text") +"</b>.</p><p>"+ rk("show-discount-price") +" <b>"+ FCLib$.formatMoney(PrecoProd*((100-iDescontoAvista)/100),FC$.Currency) +"</b></p></div>";
  }

  function fnCreateEventGA(sCategory,sAction,sLabel){
    if(typeof ga!=='undefined'){
      ga('send','event',sCategory,sAction,sLabel);
    }
  }
  
  /* Show and Hide Banner Home */
  function fnHideShowBannersHome(){
   if(fnGetConfig("Home_Slideshow")){
      var FCHideHomeBanners = document.getElementById('FC-HideHomeBanners');
      var FCShowHomeBanners = document.getElementById('FC-ShowHomeBanners');
      FCShowHomeBanners.innerHTML = FCHideHomeBanners.innerHTML;
      if(!FC$.isEH){      
        var oTxtSlide1 = document.getElementsByClassName("home-slide-txt-1");
        for (i = 0; i < oTxtSlide1.length; i++) {
          oTxtSlide1[i].style.display="none";
        }         
        var oTxtSlide2 = document.getElementsByClassName("home-slide-txt-2");
        for (i = 0; i < oTxtSlide2.length; i++) {
          oTxtSlide2[i].style.display="none";
        }               
      }
    }else{
      function fnDisplayOnlyBanner(displayMediaSize) {
        if (displayMediaSize.matches) {
          var FCHideHomeBanners = document.getElementById('FC-HideHomeBanners');
          var FCShowHomeBanners = document.getElementById('FC-ShowHomeBanners');
          FCShowHomeBanners.innerHTML = ''; 
        } else {
          var FCHideHomeBanners = document.getElementById('FC-HideHomeBanners');
          var FCShowHomeBanners = document.getElementById('FC-ShowHomeBanners');
          FCShowHomeBanners.innerHTML = '<a href="'+ FCLib$.uk("url-sale") +'"><img src="'+FC$.PathImg +'fundotop.jpg" width="100%" alt="Banner"></a>';  
        }
      }
      var displayMediaSize = window.matchMedia("(max-width:1024px)")
      fnDisplayOnlyBanner(displayMediaSize)
      displayMediaSize.addListener(fnDisplayOnlyBanner)  
    }
  }
  
  /* Availability warning */
  function fnLinkDisp(iStock,ProdId){
    if(iStock==0){
      document.write("<a href='javascript:MostraDisp("+ FC$.IDLoja +","+ ProdId +")'>"+ rk("notify-when-available") +"</a>");
    }
  }
  
  /* Video Filter */
  function fnShowVideo(ProductId,oProdFilters,sImagemProdPri,sNomeProd){
    var sVideo="";
    if(oProdFilters.length>0){
      var iFiltroVideo=oProdFilters[0].pFilNames["video"];
      if(iFiltroVideo!=undefined)sVideo=oProdFilters[0].pFil[iFiltroVideo].value;
    }
    fnVideoImage(ProductId,sVideo,sImagemProdPri,sNomeProd);
  }
  
  /* Video and Image Product */
  function fnVideoImage(ProductId,videoProduct,ImagemProdPri,NomeProd){
    var replaceNomeProd = NomeProd.replace(/-/g,' ');
    if (videoProduct==""){
      document.getElementById("id-video-image"+ProductId).innerHTML="<div class='ImgCapaListProd DivListproductStyleImagemZoom'><img src="+ ImagemProdPri +" alt=\""+ replaceNomeProd +"\" onerror='MostraImgOnError(this,0)'></div>";
    }else{
     document.getElementById("id-video-image"+ProductId).innerHTML="<video id=prodVideo"+ ProductId +" class='videoProd' preload=auto loop src='https://my.mixtape.moe/"+ videoProduct +".mp4'></video>";
     function execVideoEvents(){
      var oVideo=document.getElementById("prodVideo"+ProductId);
      if(FCLib$.isOnScreen(oVideo))oVideo.play();
     }
     execVideoEvents();
     FCLib$.AddEvent(document,"scroll",execVideoEvents);
    }
  }
  
  /* Header Searchbox */
  function fnShowSearchBox(){
  var iconSearchBoxHideIcon = document.getElementById("header-mainbar-container-search-icon");
  var iconSearchBoxResult = document.getElementById("header-mainbar-container-search-result");
  var iconSearchBoxHideIconLogin = document.getElementById("header-mainbar-container-login");
    if (iconSearchBoxResult.style.display === "block") {
        iconSearchBoxResult.style.display = "none";
    } else {
        iconSearchBoxResult.style.display = "block";
        iconSearchBoxHideIcon.style.display = "none";
        iconSearchBoxHideIconLogin.style.position = "relative";
        iconSearchBoxHideIconLogin.style.left = "15px";
    }
  }
  function fnCloseSearchBox(){
    var iconSearchBoxClose = document.getElementById("header-mainbar-container-search-result");
    iconSearchBoxClose.style.display = "none";
    var iconSearchBoxHideIcon1 = document.getElementById("header-mainbar-container-search-icon");
    iconSearchBoxHideIcon1.style.display = "block";
    var iconSearchBoxHideIconLogin = document.getElementById("header-mainbar-container-login");
    iconSearchBoxHideIconLogin.style.position = "relative";
    iconSearchBoxHideIconLogin.style.left = "0px";
  }
  
  function fnSearchInputGetFocus(){
    document.getElementById("autocomplete").focus();
  }
  
  /* Home Slideshow */
  function fnSlideshowSwiper(){
    var swiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      autoplay: {
       delay: 5000,
      },
    });
  }
  
  /* Voice Search */
  function fnStartDictation(){
    if (window.hasOwnProperty('webkitSpeechRecognition')) {
      var recognition = new webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "pt-BR";
      recognition.start();
      recognition.onresult = function(e) {
        document.getElementById('autocomplete').value = e.results[0][0].transcript;
        recognition.stop();
        document.getElementById('autocomplete-form').submit();
      };
      recognition.onerror = function(e) {
        recognition.stop();
      }
    }
  }
   
  /* Mouseover change image Home and List */
  function fnChangeImages(sImagemProdPri,sImagemProdDet,sDescUrl,sProductId,sNomeProd){
    var replaceNomeProd=sNomeProd.replace(/-/g,' ');
    var tagImgPri=sImagemProdPri;
    var sIdCampo="DivImagemProdDouble"+ sProductId;
    if(fnGetConfig("Change_Image_Hover_Home_ProductList")){
      if (tagImgPri==""){
        document.getElementById(sIdCampo).innerHTML="<img height='200px' src='/images/nd0.gif'>";
      }
      else {
        var tagImgDet=sImagemProdDet;
        var sLenghtImg=tagImgDet;
        var nLenghtImg=sLenghtImg.search(",");
        if(nLenghtImg<0){
          document.getElementById(sIdCampo).innerHTML="<a href=" + sDescUrl + "><img data-src='" + sImagemProdPri + "' alt=\""+ replaceNomeProd +"\"></a>";
        }
        else {
          var valImgDet=null;
          if(tagImgDet!=null){valImgDet = tagImgDet.split(",");}
          var imgDet0=valImgDet[0];
          var imgDet1=valImgDet[1];
          if((imgDet0.indexOf('#')>=0 && imgDet0.indexOf('/')>=0) || (imgDet1.indexOf('#')>=0 && imgDet1.indexOf('/')>=0)){
            imgDet0=valImgDet[0].replace('#', "/lojas/");
            imgDet1=valImgDet[1].replace('#', "/lojas/");
          }
          else if(imgDet0.indexOf('#')>=0 || imgDet1.indexOf('#')>=0){
            imgDet0=valImgDet[0].replace('#', FC$.PathPrdExt);
            imgDet1=valImgDet[1].replace('#', FC$.PathPrdExt);
          }
          else {
            imgDet1=FC$.PathPrd + valImgDet[1];
          }
          if(imgDet0==null){
            document.getElementById(sIdCampo).innerHTML="<a href=" + sDescUrl + "><img height='159' data-src='" + sImagemProdPri + "' alt=\""+ replaceNomeProd +"\"></a>";
          }
          else {
            document.getElementById(sIdCampo).innerHTML="<a href=" + sDescUrl + "><img height='159' data-src='" + imgDet0 + "'' border='0'' onmouseover=\"this.src='" + imgDet1 + "'\" onmouseout=\"this.src='" + imgDet0 + "'\" alt=\""+ replaceNomeProd +"\"></a>";
          }
        }
      }
    }else{
      document.getElementById(sIdCampo).innerHTML="<a href=" + sDescUrl + "><img height='159' data-src='" + sImagemProdPri + "' alt=\""+ replaceNomeProd +"\"></a>";
    }
  }
  
  /* Calculate QTY Cart */
  function fnCalculateQtyCart(){
    if(FC$.Page=="Cart"){
      var script = document.createElement('script');
      script.onload = function() {
      };
      script.src = FC$.PathHtm+'js/calculate-qty-cart.js';
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  }
  
  /* Sold out List */
  function fnGetProductSoldOutID(IDProduto,QtyStock){
    if(fnGetConfig("Product_SoldOut_Badge_ProductList")){
      var showIDProduct=IDProduto;
      var showQtyStock=QtyStock;    
      if(showQtyStock==0){
        var soldOut=document.getElementById("DivProd"+showIDProduct);
        soldOut.style.backgroundColor = "#ffffff";
        var soldOutIMG=document.getElementById("DivImagemProdDouble"+showIDProduct);
        soldOutIMG.style.opacity="0.9";
        var soldOutText=document.getElementById("zFProdSoldOut"+showIDProduct);
        soldOutText.innerHTML="<div class='zFProdSoldOut-text'>"+ rk("list-sold-out") +"</div>"  
      } 
    }
  }
  
  /* Sold out SubProduct List */
  function fnGetSubProductSoldOutID(IDProduto,QtySubStock,bTemSubsStock){
    if(fnGetConfig("Product_SoldOut_Badge_SubProduct_ProductList")){
      var showSubIDProduct=IDProduto;
      var showSubQtyStock=QtySubStock;
      var showbTemSubsStock=bTemSubsStock;    
      if(showSubQtyStock==0 && showbTemSubsStock){
        var soldOut=document.getElementById("DivProd"+showSubIDProduct);
        soldOut.style.backgroundColor="#ffffff";
        var soldOutIMG=document.getElementById("DivImagemProdDouble"+showSubIDProduct);
        soldOutIMG.style.opacity="0.9";
        var soldOutText=document.getElementById("zFProdSoldOut"+showSubIDProduct);
        soldOutText.innerHTML="<div class='zFProdSoldOut-text'>"+ rk("list-sold-out") +"</div>"
      }  
    }
  }

  function initScope(){
    iNextPageButFC=fnGetConfig("Next_page_button");
    bBuyWishlist=fnGetConfig("Show_wishlist");
    iDescontoAvista=fnGetConfig("One_parcel_discount");  
    /* Juros para parcelamento em 1x, 2x, 3x, etc. */
    Juros[0]=fnGetConfig("Interest_1_parcel"); //1x (à vista)
    Juros[1]=fnGetConfig("Interest_2_parcels"); //2x
    Juros[2]=fnGetConfig("Interest_3_parcels"); //3x
    Juros[3]=fnGetConfig("Interest_4_parcels"); //4x
    Juros[4]=fnGetConfig("Interest_5_parcels"); //5x
    Juros[5]=fnGetConfig("Interest_6_parcels"); //6x
    Juros[6]=fnGetConfig("Interest_7_parcels"); //7x
    Juros[7]=fnGetConfig("Interest_8_parcels"); //8x
    Juros[8]=fnGetConfig("Interest_9_parcels"); //9x
    Juros[9]=fnGetConfig("Interest_10_parcels"); //10x
  }
  initScope();
  
  /* Cookie Policy Footer Warning */
  function fnCookieWarning(){
    if(fnGetConfig("Footer_Cookie_Policy")){

      function createCookie(name, value, days){
        if(days){
          var date=new Date();
          date.setTime(date.getTime()+(days*24*60*60*1000));
          var expires="; expires="+ date.toGMTString();
        }else var expires="";
          document.cookie=name +"="+ value + expires +"; path=/";
      }

      function readCookie(name){
        var nameEQ=name +"=",
            ca=document.cookie.split(';');
        for(var i=0;i<ca.length;i++){
          var c=ca[i];
          while(c.charAt(0)==' ')c=c.substring(1,c.length);
          if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length);
        }
        return null;
      }

      function eraseCookie(name){createCookie(name,"",-1);}

      var cookieBody=document.getElementsByTagName("BODY")[0],
          cookieLaw=document.getElementById("cookie-law"),
          cookieURL=document.getElementById("cookie-url"),
          cookieName="cookiewarning",
          cookieWarning=document.createElement("div."+ cookieName);
 
      function setCookieWarning(active){(!!active)?cookieBody.classList.add(cookieName):cookieBody.classList.remove(cookieName);}

      cookieURL.href="/page,arq,cookie-policy-"+ ("0"+FC$.Language).slice(-2) +".htm,cookie";
      cookieLaw.addEventListener("click", function(){
        createCookie(cookieName,1,365)
        setCookieWarning(false);
      });

      if(readCookie(cookieName)!=1)setCookieWarning(true);

      function removeMe(){
	eraseCookie(cookieName);
	setCookieWarning(false);
      }
    }
  }
  
  /* Insert aria-label ecommerce badge */
  function fnAriaLabelInclude(){
    var poweredBy = document.getElementById("idBadgeFC").getElementsByTagName('a')[0].setAttribute("aria-label", "ecommerce");
  }
  
  /* Grid position thumbnails with video */  
  function fnGridVideoPosition(){  
    if(FC$.Page=="Products"){
      var getPositionThumbs = document.querySelector('#position-thumbnails');
      var changePositionThumbs = document.getElementsByClassName('multiple-thumbnails');
      var i;
      for (i = 0; i < changePositionThumbs.length; i++) {
        getPositionThumbs.appendChild(changePositionThumbs[i]);
      }
    }
  }
  
  /* Grid Video */
  function fnInsertVideoGridThumb(){
    if(FC$.Page=="Products"){
      var getProductsContainers= document.querySelectorAll('.zoom-gallery .selectors a');
      for (var i = 0; i < getProductsContainers.length; i++){
        getProductsContainers[i].onclick = function(event){ 
          var getIframe = document.querySelectorAll('div.active iframe[src*="youtube"]');       
          if (getIframe.length){getIframe.src;}  
          var getZoomGallerySlide = document.querySelector('.zoom-gallery .zoom-gallery-slide');
          if (getZoomGallerySlide){getZoomGallerySlide.classList.remove('active');}  
          var getSelectorsAhref = document.querySelector('.zoom-gallery .selectors a');
          if (getSelectorsAhref){getSelectorsAhref.classList.remove('active');}  
          var getDataSlide = document.querySelector('.zoom-gallery .zoom-gallery-slide[data-slide-id="'+ this.getAttribute('data-slide-id') +'"]');    
          if (getDataSlide) {getDataSlide.classList.add('active');}    
          var getDataSlideID = this.getAttribute('data-slide-id');
          var getVideoDiv = document.getElementById("get-video-display");
          var getGridVideoIframe = document.getElementById("gridYoutubeVideo");
          if(getDataSlideID == "zoom"){
            var iframes = getVideoDiv.getElementsByTagName("iframe");
            if (iframes != null) {
              for (var i = 0; i < iframes.length; i++){
                iframes[i].src = iframes[i].src;
                getVideoDiv.style.display = "none";
              }
            }      
          }else{
            getVideoDiv.style.display = "block";
            getGridVideoIframe.style.display = "block";
          }
          event.preventDefault();
        }
      }
    }    
  } 
  
  /* Recommend This Product */
  function fnInsertRecommendProduct(){
    if(FC$.Page=="Products"){     
      var aLinks=document.getElementsByClassName("det-product-recommend"),iLinks=aLinks.length;
      if(fnGetConfig("Recommend_Product"))for(var i=0;i<iLinks;i++)aLinks[i].style.display="block";
      else for(var i=0;i<iLinks;i++)aLinks[i].innerHTML="";
    }
  }
  
  /* Insert Aria label Filters */  
  function fnInsertLabelFilters(){
    if(FC$.Page=="Products"){ 
      var insertLabelSearchFilter = document.querySelectorAll(".SearchFil")      
      for (i = 0; i < insertLabelSearchFilter.length; i++) {
        insertLabelSearchFilter[i].setAttribute("aria-label","Search Fil");
      }       
      var insertLabelInputFilter = document.getElementsByName("CatFil");
      for (i = 0; i < insertLabelInputFilter.length; i++) {
        insertLabelInputFilter[i].setAttribute("aria-label","Cat Fil");
      }             
    }
  }
  
  /* Insert Alt Breadcrumb Separtor */   
  function fnInsertAltShimImg(){
    if(FC$.Page=="Products"){ 
      var insertAltShim = document.querySelectorAll(".wid")      
      for (i = 0; i < insertAltShim.length; i++) {
        insertAltShim[i].setAttribute("alt","separator");
      }                   
    }
  }  
  
  /* Hide ZipCode Language */
  function fnHideZipcodeTab(){
    if(FC$.Page=="Products"){ 
      var sBrazilLanguage = "0";
      var sWorldLanguage = "1";
      var hideZipCodeTab = document.getElementById("det-product-tab3-label")
      if(hideZipCodeTab){
        if(FC$.Language == sBrazilLanguage){
           hideZipCodeTab.style.display = "initital";
        }else if(FC$.Language >= sWorldLanguage){
          hideZipCodeTab.style.display = "none";
        }
      }
    }
  }
  
  return{
    execLangResource:execLangResource,
    sCurrentPage:sCurrentPage,
    fnGetID:fnGetID,
    fnGetConfig:fnGetConfig,
    fnCustomizeIconsSocialNetworks:fnCustomizeIconsSocialNetworks,
    fnPreloadImages:fnPreloadImages,
    fnLogout:fnLogout,
    fnShowProd:fnShowProd,
    fnShowButtonCart:fnShowButtonCart,
    fnShowDisp:fnShowDisp,
    fnSearchSubmit:fnSearchSubmit,
    fnFormatNumber:fnFormatNumber,
    fnShowCart:fnShowCart,
    fnGoCart:fnGoCart,
    fnUpdateCart:fnUpdateCart,
    fnLoadXMLPageHistory:fnLoadXMLPageHistory,
    fnShowPageHistory:fnShowPageHistory,
    fnInsertVideo:fnInsertVideo,
    fnAdjustsFilters:fnAdjustsFilters,
    fnLoginUserName:fnLoginUserName,
    fnCliLogout:fnCliLogout,
    fnMostraDescontoProdDet:fnMostraDescontoProdDet,
    fnCreateEventGA:fnCreateEventGA,
    fnHideShowBannersHome:fnHideShowBannersHome,
    fnLinkDisp:fnLinkDisp,
    fnShowVideo:fnShowVideo,
    fnShowSearchBox:fnShowSearchBox,
    fnCloseSearchBox:fnCloseSearchBox,
    fnSearchInputGetFocus:fnSearchInputGetFocus,
    fnSlideshowSwiper:fnSlideshowSwiper,
    fnStartDictation:fnStartDictation,
    fnChangeImages:fnChangeImages,
    fnCalculateQtyCart:fnCalculateQtyCart,
    fnGetProductSoldOutID:fnGetProductSoldOutID,
    fnGetSubProductSoldOutID:fnGetSubProductSoldOutID,
    fnCookieWarning:fnCookieWarning,
    fnAriaLabelInclude:fnAriaLabelInclude,
    fnGridVideoPosition:fnGridVideoPosition,
    fnInsertVideoGridThumb:fnInsertVideoGridThumb,
    fnInsertRecommendProduct:fnInsertRecommendProduct,
    fnInsertLabelFilters:fnInsertLabelFilters,
    fnInsertAltShimImg:fnInsertAltShimImg,
    fnHideZipcodeTab:fnHideZipcodeTab
  }

})();

/* Wishlist - Lista de Desejos */
function FuncButtonAddToWL(idp,bAdd){
  var sCont="";
  var bProdDet=(document.body.className.search("ProductDet")>0);
  if(bProdDet){
    if(bAdd==true)sCont="<a href=\""+ FCLib$.uk("url-account") +"?&wishlist=1#Wishlist\"><span class=\"icon-share-wishlist-on-det-product\"></span><span class=\"icon-share-wishlist-on-det-product-text\">"+ rk("details-add-to-wishlist-on") +"</span></a>";
    else sCont="<a onclick=\"WL$.fnAddToWishlist("+idp+")\" rel=\"nofollow\"><span class=\"icon-share-wishlist-off-det-product\"></span><span class=\"icon-share-wishlist-off-det-product-text\">"+ rk("details-add-to-wishlist-off") +"</span></a>";
    return sCont;
  }else{
    if(bAdd==true)sCont="<a href=\""+ FCLib$.uk("url-account") +"?&wishlist=1#Wishlist\"><span class=\"icon-share-wishlist-on\"></span></a>";
    else sCont="<a onclick=\"WL$.fnAddToWishlist("+idp+")\" rel=\"nofollow\"><span class=\"icon-share-wishlist-off\"></span></a>";
    return sCont; 
  }
}

/* Functions for the shopping cart */
var oDivShowCartOnPage=null;
var iLastCartOnPage=0;

function ShowCartOnPage(IDLoja,iErr,sMsg,sCartText,sCheckoutText,este){
  if(!IsFramePage){
    Cart$.fnShowCartCheckout(null,iErr,sMsg);
  }
  else {
    var oPos=getPos(este);
    if(oDivShowCartOnPage==null){
      var oNewElement=document.createElement("div");
      oNewElement.setAttribute("id","DivShowCartOnPage"); 
      oDivShowCartOnPage=document.body.appendChild(oNewElement);
    }
    oDivShowCartOnPage.style.display="none";
    oDivShowCartOnPage.style.backgroundColor="#fcfcfc";
    oDivShowCartOnPage.style.borderColor="#cdcdcd";
    oDivShowCartOnPage.style.color="#555555";
    oDivShowCartOnPage.style.border="1px solid #cdcdcd";
    oDivShowCartOnPage.style.marginTop="-95px";
    oDivShowCartOnPage.style.marginLeft="0px";
    oDivShowCartOnPage.style.position="absolute";
    oDivShowCartOnPage.style.zIndex="1";
    var iW=238;
    var iH=100;
    var oPosPrice=document.getElementById('PosPrice');
    if(oPosPrice){
      iW=oPosPrice.offsetWidth;
      iH=oPosPrice.offsetHeight;
    }
    if(iErr==0){var sBackColor="3187e6";var iLH=45} else {var sBackColor="949494";var iLH=25}
    var sHTML="<table id=idTabShowCartOnPageFC width='"+iW +"' height='"+ iH +"' cellpadding=3 cellspacing=3>";
    sHTML+="<tr onclick=top.location.href='"+ FCLib$.uk("url-add-product") +"'><td id=idTDTitShowCartOnPageFC colspan=2 align=center style='background-color:#"+ sBackColor +";color:#ffffff;border-width:1px;border-color:#3b6e22;font-weight:bold;font-size:12px;cursor:pointer'><div style='padding:5px; line-height:"+ iLH +"px;'>"+ sMsg +"</div></td></tr>";
    if(iErr==0){
      sHTML+="<tr height=45>";
      sHTML+="<td valign=top align=center style=cursor:pointer onclick=top.location.href='"+ FCLib$.uk("url-add-product") +"'><a href='"+ FCLib$.uk("url-add-product") +"'><span class='fc-cart-onpage-cart-txt'>"+ rk("cart-on-page-go-to-shopping-cart") +"</span></a></td>";
      sHTML+="<td align=left><img src='"+ FC$.PathImg +"iconclose.svg?cccfc=1' width=20 height=20 hspace=5 style='cursor:pointer;margin-top:10px' onclick=oDivShowCartOnPage.style.visibility='hidden'></td>";
      sHTML+="</tr>";
    }
    else{
      sHTML+="<tr height=25>";
      sHTML+="<td colspan=2 align=center><img src='"+ FC$.PathImg +"iconclose.svg?cccfc=1' width=20 height=20 hspace=5 style='cursor:pointer;margin:10px;' onclick=oDivShowCartOnPage.style.visibility='hidden'></td>";
      sHTML+="</tr>";
    }
    sHTML+="</table>";
    oDivShowCartOnPage.style.top=(typeof(IsSpy)=="boolean"?(oPos.y+300):oPos.y)+"px";
    oDivShowCartOnPage.style.left=oPos.x+"px";
    oDivShowCartOnPage.innerHTML=sHTML;
    oDivShowCartOnPage.style.visibility="visible";
    iLastCartOnPage++;
    setTimeout("if(iLastCartOnPage=="+ iLastCartOnPage +")oDivShowCartOnPage.style.visibility='hidden';",4000);
    sF$.fnUpdateCart(true,IsFramePage);
  }
}

/* ZipCode - CEP */
function fnShowCEP(IDProd){
  if(FC$.TypeFrt==3 || FC$.TypeFrt==4){
    var sNumCEP=fnGetCookie('CEP'+FC$.IDLoja);
    if(sNumCEP==null)sNumCEP="";
    sCEP="<div id='idDivCEPFC'>";
    sCEP+="  <div id='idDivTitCEP'><span class='font-bold'>"+ rk("details-zip-code-title") +"</span></div>";
    sCEP+="  <div id='idDivContentCEP'>";
    sCEP+="    <div id='idDivContentFieldsCEP'>";
    sCEP+="      <div id='idDivCEPCalc'>";
    sCEP+="        <div class='FieldCEP FieldCEPQty'><label>"+ rk("details-zip-code-qty") +"</label><input type='number' id='idQtdZip"+ IDProd +"' value='1' maxlength='4' aria-label='qtd'></div>";
    sCEP+="        <div class='FieldCEP FieldCEPNum'><input type='text' placeholder='CEP' id='idZip"+ IDProd +"' value='"+ sNumCEP +"' maxlength='9' aria-label='zip code'></div>";
    sCEP+="        <img src='"+ FC$.PathImg +"icon-arrow-cep.svg?cccfc=1' height='50px' width='50px' alt='Simular frete' id='idCEPButton' class='FieldCEPBtn' onclick='fnGetShippingValuesProd("+ IDProd +")'>";
    sCEP+="      </div>";
    sCEP+="    </div>";
    sCEP+="    <div id='idDivImgLoadingCEPFC'><img src='"+ FC$.PathImg +"loadingcep.gif?cccfc=1' vspace=3 style='display:none;' id=ImgLoadingCEP></div>";
    sCEP+="    <div id='idShippingValues"+ IDProd +"'></div></div>";
    sCEP+="  </div>";
    if(FC$.TypeFrt==4)sCEP+="<div class='FreightTxtOnlyBR'><img src='"+FC$.PathImg+"icexclamation.svg?cccfc=1'>"+ rk("details-zip-code-simulation-brazil") +"</div>";
    sCEP+="</div>";
    var oShowCEP=document.getElementById("ShowCEP"+IDProd);
    if(oShowCEP)oShowCEP.innerHTML=sCEP;
  }
}

function fnGetShippingValuesProd(IDProd){
  sCEP=document.getElementById("idZip"+ IDProd).value;
  fnSetCookie('CEP'+FC$.IDLoja,sCEP);
  if(sCEP==""){document.getElementById("idShippingValues"+IDProd).innerHTML="<span class='freightResult' style=color:#990000;>"+ rk("get-shipping-insert-zip-code") +"</span>";return;}
  document.getElementById("idShippingValues"+IDProd).innerHTML="";
  document.getElementById("ImgLoadingCEP").style.display='';
  var iQty=document.getElementById("idQtdZip"+IDProd).value;
  if(IDProd)var sParamProd="&"+ (FCLib$.fnUseEHC()?"productid":"idproduto") +"="+ IDProd;
  else var sParamProd="";
  AjaxExecFC(FCLib$.uk("url-xml-shipping-cep"),"qty="+ iQty +"&cep="+ sCEP + sParamProd,false,processXMLCEP,IDProd);
}

function processXMLCEP(obj,IDProd){
  var sShipping="";
  var oShippingValues=document.getElementById("idShippingValues"+IDProd);
  var iErr=ReadXMLNode(obj,"err");if(iErr==null)return;
  if(iErr!="0"){
    document.getElementById("ImgLoadingCEP").style.display='none';
    oShippingValues.innerHTML="<span class='freightResult' style=color:#990000;>"+ ReadXMLNode(obj,"msg") +"</span>";
    return;
  }
  oShippingValues.innerHTML="";
  var UseCart=ReadXMLNode(obj,"UseCart");
  if(UseCart=="False"){
    var ProdName=ReadXMLNode(obj,"ProdName");
    var ProdRef=ReadXMLNode(obj,"ProdRef");  
  }
  sShipping+="<div class='ZipOptions'>";
  var iOpt=ReadXMLNode(obj,"OptQt");
  for(var i=1;i<=iOpt;i++){
    var OptName=ReadXMLNode(obj,"Opt"+ i +"Name");
    var OptImage=ReadXMLNode(obj,"Opt"+ i +"Image");
    var OptObs=ReadXMLNode(obj,"Opt"+ i +"Obs");
    if(OptObs==null)OptObs="";
    sValorFrete=ReadXMLNode(obj,"Opt"+ i +"Value");
    if(sValorFrete==FC$.Currency+" 0,00")sValorFrete=""+ rk("get-shipping-insert-zip-code-free-shipping") +"";
    sShipping+="<div class='ZipOption'>";
    sShipping+="  <div class='ZipNameObs'>";
    sShipping+="    <div class='ZipName'>"+ OptName +"</div>";
    sShipping+="    <div class='ZipObsVal'>"+ OptObs +"</div>";
    sShipping+="  </div>";
    sShipping+="  <div class='ZipValue'>"+ sValorFrete +"</div>";
    sShipping+="</div>";
  }
  oShippingValues.innerHTML=sShipping;
  oShippingValues.style.display="block"; 
  sShipping+="</div>";
  document.getElementById("ImgLoadingCEP").style.display='none';
}

function fnGetCookie(name){
  var arg=name+"=";
  var alen=arg.length;
  var clen=document.cookie.length;
  var i=0;
  while (i<clen){
    var j=i+alen;
    if(document.cookie.substring(i,j)==arg)return fnGetCookieVal(j);
    i=document.cookie.indexOf(" ",i)+1;
    if(i==0)break;
  }
  return null;
}

function fnGetCookieVal(offset){
  var endstr=document.cookie.indexOf(";",offset);
  if (endstr==-1)endstr=document.cookie.length;
  return unescape(document.cookie.substring(offset,endstr));
}

function fnSetCookie(name,value){
  var argv=fnSetCookie.arguments;
  var argc=fnSetCookie.arguments.length;
  var expires=(argc>2)?argv[2]:null;
  var path=(argc>3)?argv[3]:null;
  var domain=(argc>4)?argv[4]:null;
  var secure=(argc>5)?argv[5]:false;
  document.cookie=name+"="+escape(value)+((expires==null)?"":(";expires=" + expires.toGMTString()))+((path==null)?"":(";path="+path))+((domain==null)?"":(";domain="+domain))+((secure==true)?"; secure":"");
}
/* Frete - CEP - End */

/* Smart Suggestions */
function fnCallbackSuggestions(aTerms){
  "use strict";
  var iTerms=aTerms.length;
  if(FC$.Page=="News"){
    var sParamName="textobuscanews"
    var sIDNotFound="idNotFoundNewsFC";
  }
  else{
    var sParamName="texto"
    var sIDNotFound="idTxtCatNotFoundFC";
  }
  var oNotFound=FCLib$.GetID(sIDNotFound);
  if(oNotFound && iTerms>=1){
    if(iTerms>10)iTerms=10;
    var sTerms="<div id=GoogleTerms><ul><li><b>";
    if(iTerms>1)sTerms+=rk("smart-suggestions-by-Google-plural");
    else sTerms+=rk("smart-suggestions-by-Google");
    sTerms+="</b></li>";
    for(var i=0;i<iTerms;i++)sTerms+="<li><a href='"+ FCLib$.fnGetSearchURL(aTerms[i],sParamName) +"'>"+ aTerms[i] +"</a></li>";
    sTerms+="</ul></div>";
    oNotFound.insertAdjacentHTML('afterend',sTerms);
  }
}

/* Functions executed in the footer */
function fnFooter(){
  sF$.fnUpdateCart(false,false);
  
  FCLib$.onReady(function(){
    FCLib$.useLangResource(oResources);
    sF$.execLangResource();
    sF$.fnCustomizeIconsSocialNetworks(false);
    if(FC$.query!="")FCLib$.fnGetSuggestions(decodeURIComponent(FC$.query),true,fnCallbackSuggestions);
    FCLib$.execWaveInterchange();
    fnSpeechRecognitionIOS();
    fnNewsVoiceSearch();
    sF$.fnCalculateQtyCart();
    fnFooterAccordion();
    fnChangeDivMenuPosition();
    sF$.fnCookieWarning();
    sF$.fnLoadXMLPageHistory();
    sF$.fnAriaLabelInclude();
    sF$.fnGridVideoPosition();
    sF$.fnInsertVideoGridThumb();
    sF$.fnInsertRecommendProduct();
    sF$.fnInsertLabelFilters();
    sF$.fnInsertAltShimImg();
    sF$.fnHideZipcodeTab();

    if(FC$.Page=="Products"){
      if(iQtdProds>2){
        var oScript=document.createElement('script');
        oScript.type='text/javascript';
        oScript.async=true;
        oScript.src=FC$.PathHtm+'js/sort-lib.js?cccfc=10';
        var sAddScript=document.getElementsByTagName('script')[0];
        sAddScript.parentNode.insertBefore(oScript,sAddScript);
      }
    }
    else if(FC$.Page=="Track"){
      FCLib$.fnOrderTrack();
    }
    else if(FC$.Page=="Cart"){
      fnButCupom();
      SaveCart$.fnShowSaveCart();
    }
    else if(FC$.Page=="Home"){
      sF$.fnHideShowBannersHome();
      sF$.fnSlideshowSwiper();
    }
    else if(FC$.Page=="News"){ /* format news full-date with local language */
      var oDateTime=document.querySelector("#idDateNewsFC");
      if(oDateTime){
        var sDatetime=oDateTime.getAttribute("datetime"),
         oDatetime=new Date(sDatetime),
         oOptions={weekday:"long",year:"numeric",month:"long",day:"numeric"},
         sFormatted;
        try{sFormatted=oDatetime.toLocaleDateString(document.documentElement.lang,oOptions);} /* try to use the html lang attr */
        catch(e){sFormatted=oDatetime.toLocaleDateString("i-default",oOptions);} /* use the user language */
        oDateTime.innerHTML=sFormatted;
        oDateTime.style.display="inline";
      }
    }
  });
  
  sF$.fnLogout();
  fnShowYear();

  FCLib$.ShowBadgeFC();
  var ListVerify=document.querySelector('.ProductList');
  if (FC$.Page=="Products" && ListVerify){
    document.querySelector('#idFCContent').setAttribute('class','col-large-9 col-xlarge-10');
  };

}

function fnFooterPed(){
  fnShowYear();
}
function fnShowYear(){
  /* Show year Rodape.htm */
  var footerDate = new Date();
  var footerYearDisplay = footerDate.getFullYear();
  var oFooterFullYear=document.getElementById("FooterFullYear");
  if(oFooterFullYear)oFooterFullYear.innerHTML = footerYearDisplay;
}

var bCascate=false;
function NoCascate(sURL){
  if(!bCascate){
    bCascate=true;
    location.href=sURL;
  }
  else bCascate=false;
}

/* Product Grid */
/* Function to show installment */
function fnMaxInstallmentsGrid(PrecoProd,MaxParcelas){
  var ComSem;
  if(typeof Juros!="undefined"){
    if(PrecoProd==0||MaxParcelas==1||Juros.length==0)return "";
    if(MaxParcelas==0||MaxParcelas>Juros.length)MaxParcelas=Juros.length;
    if(Juros[MaxParcelas-1]>0)ComSem=""; else ComSem="<font color=#333333> "+ rk("details-price-no-interest") +"</font>";
    return "<span class=EstParc> <br><b>"+MaxParcelas+"x</b>"+ComSem+" "+ rk("details-price-no-interest-in") +" <b>"+ FCLib$.formatMoney(CalculaParcelaJurosCompostos(PrecoProd,MaxParcelas),FC$.Currency) +"</b></span>";
  }else{
    return "";
  }
}

/* Function to display formatted price */
function FormatNumber(num){
  var num=num.toString().replace(/\$|\,/g,'');
  if(isNaN(num))num="0";
  sign=(num==(num=Math.abs(num))); num=Math.floor(num*100+0.50000000001); num=Math.floor(num/100).toString();
  for(var i=0;i<Math.floor((num.length-(1+i))/3);i++)num=num.substring(0,num.length-(4*i+3))+'.'+num.substring(num.length-(4*i+3));
  return ((sign)?'':'-')+num;
}

/* Function to show saved price on promotional products */
function fnShowEconomyGrid(ProdPrice,ProdPriceOri){
  if(ProdPrice!=ProdPriceOri && typeof FormatNumber == 'function' && typeof FormatPrice == 'function' ){
    return "<font style='font-size:16px;display:block;margin:10px 0;' color=#33691e>"+ rk("details-price-save") +" <b>"+ FCLib$.formatMoney(ProdPriceOri-ProdPrice,FC$.Currency) +"</b> ("+ FormatNumber(((ProdPriceOri-ProdPrice)/ProdPriceOri)*100)+"%)</font>";
  }else{return "";}
}

/* ZipCode Grid FC - CEP - Begin */
function fnShowCEPGrid(IDProd){
  if(FC$.TypeFrt==3){
    var sNumCEP=fnGetCookie('CEP'+FC$.IDLoja);
    if(sNumCEP==null)sNumCEP="";
    sCEP="<div id='idDivCEPFC' class='ProductDet-cep-position'>";
    sCEP+="  <div id='idDivTitCEP'><span class='font-bold'>"+ rk("details-zip-code-title") +":</span></div>";
    sCEP+="  <div id='idDivContentCEP'>";
    sCEP+="    <div id='idDivContentFieldsCEP'>";
    sCEP+="      <div id='idDivCEPCalc'>";
    sCEP+="        <div class='FieldCEP FieldCEPQty'><label>"+ rk("details-zip-code-qty") +"</label><input type='number' id='idQtdZip"+ IDProd +"' value='1' maxlength='4' aria-label='qtd'></div>";
    sCEP+="        <div class='FieldCEP FieldCEPNum'><input type='text' placeholder='CEP' id='idZip"+ IDProd +"' value='"+ sNumCEP +"' maxlength='9' aria-label='zip code'></div>";
    sCEP+="        <img src='"+ FC$.PathImg +"icon-arrow-cep.svg?cccfc=1' height='50px' width='50px' id='idCEPButton' alt='Simular frete' class='FieldCEPBtn' onclick='fnGetShippingValuesProdGrid("+ IDProd +")'>";
    sCEP+="      </div>";
    sCEP+="    </div>";
    sCEP+="    <div id='idDivImgLoadingCEPFC'><img src='"+ FC$.PathImg +"loadingcep.gif?cccfc=1' alt=' ' vspace=3 style='display:none;' id=ImgLoadingCEP></div>";
    sCEP+="    <div id='idShippingValues"+ IDProd +"'></div></div>";
    sCEP+="  </div>";
    sCEP+="</div>";
    var oShowCEP=document.getElementById("ShowCEP"+IDProd);
    if(oShowCEP)oShowCEP.innerHTML=sCEP;
  }
}

function fnGetShippingValuesProdGrid(IDProd){
  sCEP=document.getElementById("idZip"+ IDProd).value;
  fnSetCookie('CEP'+FC$.IDLoja,sCEP);
  if(sCEP==""){document.getElementById("idShippingValues"+IDProd).innerHTML="<span class='freightResult'>"+ rk("get-shipping-insert-zip-code") +"</span>";return;}
  document.getElementById("idShippingValues"+IDProd).innerHTML="";
  document.getElementById("ImgLoadingCEP").style.display='';
  var iQty=document.getElementById("idQtdZip"+IDProd).value;
  if(IDProd)var sParamProd="&"+ (FCLib$.fnUseEHC()?"productid":"idproduto") +"="+ IDProd;
  else var sParamProd="";
  AjaxExecFC(FCLib$.uk("url-xml-shipping-cep"),"qty="+ iQty +"&cep="+ sCEP + sParamProd,false,processXMLCEPGrid,IDProd);
}

function processXMLCEPGrid(obj,IDProd){
  var sShipping="";
  var oShippingValues=document.getElementById("idShippingValues"+IDProd);
  var iErr=ReadXMLNode(obj,"err");if(iErr==null)return;
  if(iErr!="0"){
    document.getElementById("ImgLoadingCEP").style.display='none';
    oShippingValues.innerHTML="<span class='freightResult' style=color:#990000;>"+ ReadXMLNode(obj,"msg") +"</span>";
    return;
  }
  oShippingValues.innerHTML="";
  var UseCart=ReadXMLNode(obj,"UseCart");
  if(UseCart=="False"){
    var ProdName=ReadXMLNode(obj,"ProdName");
    var ProdRef=ReadXMLNode(obj,"ProdRef");  
  }
  sShipping+="<div class='ZipOptions'>";
  var iOpt=ReadXMLNode(obj,"OptQt");
  for(var i=1;i<=iOpt;i++){
    var OptName=ReadXMLNode(obj,"Opt"+ i +"Name");
    var OptImage=ReadXMLNode(obj,"Opt"+ i +"Image");
    var OptObs=ReadXMLNode(obj,"Opt"+ i +"Obs");
    if(OptObs==null)OptObs="";
    sValorFrete=ReadXMLNode(obj,"Opt"+ i +"Value");
    if(sValorFrete==FC$.Currency+" 0,00")sValorFrete=""+ rk("get-shipping-insert-zip-code-free-shipping") +"";
    sShipping+="<div class='ZipOption'>";
    sShipping+="  <div class='ZipNameObs'>";
    sShipping+="    <div class='ZipName'>"+ OptName +"</div>";
    sShipping+="    <div class='ZipObsVal'>"+ OptObs +"</div>";
    sShipping+="  </div>";
    sShipping+="  <div class='ZipValue'>"+ sValorFrete +"</div>";
    sShipping+="</div>";
  }
  oShippingValues.innerHTML=sShipping;
  oShippingValues.style.display="block"; 
  sShipping+="</div>";
  document.getElementById("ImgLoadingCEP").style.display='none';
}
/* ZipCode Grid FC - CEP - End */

FCLib$.onReady(FCLib$.showPwdViewer);
function FuncChkRegisterBegin(){FCLib$.showPwdViewer();}

/* Global Signin */
if(FC$.ClientID==0)FCLib$.onReady(fnShowGlobalSignin);

function fnShowGlobalSignin(){
  var oImgGlobalSign=sF$.fnGetID("idImgGlobalSignFC");
  if(oImgGlobalSign){
    var bFacebookLogin=false;
    var bGoogleLogin=false;
    var sImgs="";
    if(typeof FC$.FacebookSigninID!="undefined"){
      sImgs+="<img src='"+ FC$.PathImg +"facebooklogin.svg?cccfc=1' class='FacebookSigninClass' data-loginsuccess='fnLoginShowUserName'>";
      bFacebookLogin=true;
    } 
    if(typeof FC$.GoogleSigninID!="undefined"){
      sImgs+="<img src='"+ FC$.PathImg +"googlelogin.svg?cccfc=1' class='GoogleSigninClass' data-loginsuccess='fnLoginShowUserName'>";
      bGoogleLogin=true;
    }
    if(bFacebookLogin||bGoogleLogin)oImgGlobalSign.innerHTML=sImgs;
    if(bFacebookLogin)FCLib$.signinFacebook();
    if(bGoogleLogin)FCLib$.signinGoogle();
  }
}

function fnLoginShowUserName(user){
  sF$.fnLoginUserName(user.fullName,user.pictureURL);
}

/* Popup Don't Go */
if(sF$.fnGetConfig("Popup_Dont_Go")){
  if(FC$.Page=="Home" || FC$.Page=="Products"){
    FCLib$.onReady(function(){
      if(FCLib$.GetID("overlay")){
        /* Dynamic Don't Go Container */
        var dynamicDontGoContainer = document.createElement('div');
        dynamicDontGoContainer.id = 'ShowDontGoPopup';
        dynamicDontGoContainer.className = 'DontGoPopup';
        document.getElementsByTagName('body')[0].appendChild(dynamicDontGoContainer);
      
        /* Dynamic Don't Go Container Elements */
        var dynamicDontGoContainerElements = document.createElement('div');
        dynamicDontGoContainerElements.className = 'DontGoPopupContent';
        dynamicDontGoContainer.appendChild(dynamicDontGoContainerElements);
      
        /* Dynamic Don't Go Elements Close Button */
        var dynamicDontGoElementsCloseButton = document.createElement('div');
        dynamicDontGoElementsCloseButton.className = 'DontGoPopupCloseButton';
        dynamicDontGoContainerElements.appendChild(dynamicDontGoElementsCloseButton);
        dynamicDontGoElementsCloseButton.innerHTML = "<img id='idBtnDontGoClose' alt='Close popup' border='0' onclick='sF$.fnCreateEventGA(\"DontGo\",\"Clique\",\"Close\");'>";
      
        /* Dynamic Don't Go Elements Banner */
        var dynamicDontGoElementsBanner = document.createElement('div');
        dynamicDontGoElementsBanner.className = 'DontGoBanner';
        dynamicDontGoContainerElements.appendChild(dynamicDontGoElementsBanner);
        dynamicDontGoElementsBanner.innerHTML = "<a id='idLinkDontGo' target='_self'><img id='idImgDontGo' src='' border='0' onclick='sF$.fnCreateEventGA(\"DontGo\",\"Clique\",\"Banner\");'></a>"; 
      
        /* PreLoading Image Banner */
        var preLoadingDontGoBanner = new Image();
        preLoadingDontGoBanner.onload = function () {
          document.getElementById('idImgDontGo').src = preLoadingDontGoBanner.src;
        };
        preLoadingDontGoBanner.src = FC$.PathImg +"bannerpopupdontgo.jpg?cccfc=1";
      
        /* Show Don't Go Popup */
        FCLib$.fnDontGo(userDontGo,{
        DontGoBtnClose:FC$.PathImg +"botdontgoclose.svg?cccfc=1", /* Close button */
        DontGoBanner:FC$.PathImg +"bannerpopupdontgo.jpg?cccfc=1", /* Banner */
        DontGoLink:FCLib$.uk("url-sale"), /* Link */
        DontGoAltParam:""}, /* Alt Param */
        "DontGoCookie"); /* Cookie name */
      }
    });
  }
  function userDontGo(oParam){
    var OpenDontGoPopup=document.getElementById('ShowDontGoPopup');
    if(OpenDontGoPopup){
      document.getElementById("idBtnDontGoClose").src=oParam.DontGoBtnClose; /* Close button */
      document.getElementById("idImgDontGo").src=oParam.DontGoBanner; /* Banner */
      document.getElementById("idImgDontGo").alt=oParam.DontGoAltParam; /* Alt Param */
      document.getElementById("idLinkDontGo").href=oParam.DontGoLink; /* Link */
      sF$.fnCreateEventGA("DontGo","Open","Window");
      window.onload=OpenDontGoPopup.style.display="block";
      var CloseDontGoPopup=document.getElementsByClassName("DontGoPopupCloseButton")[0];
      CloseDontGoPopup.onclick=function(){OpenDontGoPopup.style.display="none";}
    }
  }
  function fnDontGoActions() {
    var oDontGo = document.getElementById('ShowDontGoPopup');
    if (oDontGo) {
      window.addEventListener("keydown", (function (e) {
        if (oDontGo && e.keyCode == 27) {
          oDontGo.style.display = "none";
        }
      }), false);
      oDontGo.addEventListener("click", (function (e) {
        e.stopPropagation();
        if (e.target.id != 'DontGoPopupContent' && e.target.id == 'ShowDontGoPopup') {
          oDontGo.style.display = "none";
        }
      }), false);
    }else{
      return;
    }
  }
  document.addEventListener('DOMContentLoaded', fnDontGoActions, false);
}

/* Header Off-Canvas menu */
function headerOpenNav(){
  document.getElementById("headerSidenav").style.left="0px";
  document.getElementById("offcanvas-overlay").style.display = "block";
  document.onkeyup=function(e){
    e=e||window.event;
    if(e.keyCode==27){
      document.getElementById("headerSidenav").style.left="-250px";
      document.getElementById("offcanvas-overlay").style.display = "none";
    }
  };
}
function headerCloseNav(){
  document.getElementById("headerSidenav").style.left="-250px";
  document.getElementById("offcanvas-overlay").style.display = "none";
}

/* Disable Speech Recognition IOS  */
function fnSpeechRecognitionIOS(){
  if(sF$.fnGetConfig("Header_Voice_Search")){
    if (window.hasOwnProperty('webkitSpeechRecognition')) {
      document.getElementById("voiceSearch").style.display="block";
    }else{
      document.getElementById("voiceSearch").style.display="none";
      document.getElementById("voiceSearchMGlass").style.display="block";
    }
  }else{
    document.getElementById("voiceSearch").style.display="none";
  }
}

/* Enable Speech Recognition News */
function fnNewsVoiceSearch(){
  if(sF$.fnGetConfig("News_Voice_Search")){
    if(FC$.Page=="News"){
    
      function fnStartDictationNews(){
        if (window.hasOwnProperty('webkitSpeechRecognition')) {
          var recognition = new webkitSpeechRecognition();
          recognition.continuous = false;
          recognition.interimResults = false;
          recognition.lang = "pt-BR";
          recognition.start();
          recognition.onresult = function(e) {
            document.getElementById('TextoBuscaNews').value = e.results[0][0].transcript;
            recognition.stop();
            document.getElementById('fc-news-voice-search').submit();
          };
          recognition.onerror = function(e) {
            recognition.stop();
          }
        }
      }
    
      var oForm = document.forms["BuscaNoticia"];
      oForm.setAttribute("id", "fc-news-voice-search"); 
      var newDivSpeech = document.createElement("div");
      newDivSpeech.innerHTML="<div id='fc-icon-voice-news'><img src='"+ FC$.PathImg +"icon-speech-news.svg?cccfc=1' class='header-speech-icon' id='voiceSearch' width='30' height='30' alt='Voice'></div>"
      var btnSpeech = newDivSpeech;
      btnSpeech.addEventListener('click', function () {
         fnStartDictationNews();
      });
      var reference = document.getElementById('Procurar');
      reference.parentNode.insertBefore(newDivSpeech, reference);
      if (window.hasOwnProperty('webkitSpeechRecognition')) {
        document.getElementById("voiceSearch").style.display="block";
      }else{
        document.getElementById("voiceSearch").style.display="none";
        document.getElementById("fc-icon-voice-news").style.display="none";
      }
    }
  }
}

/* Shipping Calculation in shopping cart */
function fnCustomizeCart(){
  /* Inserts field requesting ZIP code for calculating left side */
  var oFCCartSubtotals=document.getElementById("FCCartSubtotals");
  if(document.getElementById("idColPesoFC"))var sColspan=3; else var sColspan=2;
  if(oFCCartSubtotals){
    var oNewElement=document.createElement("tr");
    oNewElement.setAttribute("id","FCCartFreightCalc"); 
    oNewElement.setAttribute("class","not-on-small"); 
    var oTRFreightCalc=oFCCartSubtotals.parentNode.insertBefore(oNewElement,oFCCartSubtotals);
    var sCEPCont="<td>"+ rk("cart-zip-code-title") +": ";
       sCEPCont+="<input type=text id=idZipC1 size=10 maxlength=9 class=InputText>&nbsp;";
       //sCEPCont+="<button id='idZipC1button' class='idBut' onclick='fnGetShippingValue(1)'>"+ rk("cart-zip-code-button") +"</button>";
       sCEPCont+="<input id='idZipC1button' type=button value='"+ rk("cart-zip-code-button") +"' class=idBut class=InputButton onclick='fnGetShippingValue(1)'>";
       sCEPCont+="<span id=idShippingOptions1></span>";
       sCEPCont+="</td>";
       sCEPCont+="<td align=right colspan="+ sColspan +">";
       sCEPCont+="<span id=idShippingObs1></span>";
       sCEPCont+="</td>";
       sCEPCont+="<td align=right><span id=idShippingValue1></span><img src='/images/loading.gif' vspace=3 style='display:none' id=idImgLoadingCEP1></td>";
    oTRFreightCalc.innerHTML=sCEPCont;
  }
  /* Inserts field requesting ZIP code for calculating right side */
  var oFCCartRight=document.getElementById("FCCartSmallSubtotalPrice");
  if(!oFCCartRight)oFCCartRight=document.getElementById("FCCartSmallSubtotals");
  if(oFCCartRight){
    var oNewElement=document.createElement("div");
    oNewElement.setAttribute("id","FCCartSmallFreightCalc"); 
    var oTRFreightCalc=oFCCartRight.parentNode.insertBefore(oNewElement,oFCCartRight);    
    var sCEPCont="<div id='FCCartSmallFreight'>";
       sCEPCont+="  <div id='FCCartSmallFreight-title'>";
       sCEPCont+="    <span class='FCCartFreightLabel'>"+ rk("cart-zip-code-title") +"</span>";
       sCEPCont+="  </div>";
       sCEPCont+="  <div class='FCCartSmallFreight-field' id='FCCartSmallFreight-input'>";
       sCEPCont+="     <input type=text id=idZipC2 size=10 maxlength=9 class=InputText>";
       sCEPCont+="     <input type=button value='OK' class=idBut class=InputButton onclick='fnGetShippingValue(2)'>";
       sCEPCont+="  </div>";
       sCEPCont+="  <span id=idShippingOptions2></span>";
       sCEPCont+="  <img src='/images/loading.gif' vspace=3 style='display:none' id=idImgLoadingCEP2>";
       sCEPCont+="  </div>";
       sCEPCont+="</div>";
       sCEPCont+="<div id='FCCartSmallFreightPrice'>";
       sCEPCont+="  <ul>";
       sCEPCont+="    <li class='FCCartFreightPriceLabel' id=idShippingObs2>"+ rk("cart-zip-code-shipping-title") +":</li>";
       sCEPCont+="    <li class='FCCartFreightPriceValue' id=idShippingValue2>"+ rk("cart-zip-code-to-calculate") +"</li>";
       sCEPCont+="  </ul>";
       sCEPCont+="</div>";       
    oTRFreightCalc.innerHTML=sCEPCont;
    fnGetCEP();
  }
}

function fnGetCEP(){
  /* Zipcode in cookie */
  var sNumCEP=FCLib$.GetCookie("CEP"+FC$.IDLoja);
  if(sNumCEP && sNumCEP!=""){
    document.getElementById("idZipC1").value=sNumCEP;
    document.getElementById("idZipC2").value=sNumCEP;
    fnGetShippingValue(0);
  }
}

function fnGetShippingValue(iField){
  var oShippingOptions1=document.getElementById("idShippingOptions1");
  var oShippingOptions2=document.getElementById("idShippingOptions2");
  if(oShippingOptions1)oShippingOptions1.innerHTML="";
  if(oShippingOptions2)oShippingOptions2.innerHTML="";
  if(iField==0){
    var sCEP=document.getElementById("idZipC1").value;
    if(sCEP=="")sCEP=document.getElementById("idZipC2").value;
  }
  else{
    var sCEP=document.getElementById("idZipC"+iField).value;
  }
  document.getElementById("idZipC1").value=sCEP;
  document.getElementById("idZipC2").value=sCEP;   
  FCLib$.SetCookie("CEP"+FC$.IDLoja,sCEP);
  if(sCEP==""){
    document.getElementById("idShippingValue1").innerHTML="<span style=color:#990000;>"+ rk("get-shipping-insert-zip-code") +"</span>";
    document.getElementById("idShippingValue2").innerHTML="<span style=color:#990000;>"+ rk("get-shipping-insert-zip-code") +"</span>";
  }
  else{
    document.getElementById("idShippingValue1").innerHTML="";
    document.getElementById("idShippingValue2").innerHTML="";
    var oImgLoadingCEP1=document.getElementById("idImgLoadingCEP1");
    if(oImgLoadingCEP1){oImgLoadingCEP1.style.display="";}
    var oImgLoadingCEP2=document.getElementById("idImgLoadingCEP2");
    if(oImgLoadingCEP2){oImgLoadingCEP2.style.display="";}
    AjaxExecFC(FCLib$.uk("url-xml-shipping-cep"),"cep="+ sCEP,false,fnprocessXMLCEPC);
  }
}

function fnprocessXMLCEPC(obj){
  var oShippingObs1=document.getElementById("idShippingObs1");
  var oShippingObs2=document.getElementById("idShippingObs2");
  var oShippingValue1=document.getElementById("idShippingValue1");
  var oShippingValue2=document.getElementById("idShippingValue2");
  var iErr=ReadXMLNode(obj,"err");if(iErr==null)return;
  if(iErr!="0"){
    var oImgLoadingCEP1=document.getElementById("idImgLoadingCEP1");
    if(oImgLoadingCEP1){oImgLoadingCEP1.style.display="none";}
    var oImgLoadingCEP2=document.getElementById("idImgLoadingCEP2");
    if(oImgLoadingCEP2){oImgLoadingCEP2.style.display="none";}
    oShippingValue1.innerHTML="<span id=idErrXMLCEPFC style=color:#990000;>"+ ReadXMLNode(obj,"msg") +"</span>";
    oShippingValue2.innerHTML="<span id=idErrXMLCEPFC style=color:#990000;>"+ ReadXMLNode(obj,"msg") +"</span>";
    return;
  }
  oShippingObs1.innerHTML="";oShippingObs2.innerHTML="";oShippingValue1.innerHTML="";oShippingValue2.innerHTML="";

  var sValFreteAtual="";
  var sOpFreteSelected="";
  var iOpt=ReadXMLNode(obj,"OptQt");
  if(iOpt>1){
    var bAlredySelectedOption=false;
    sOpFreteSelected=FCLib$.GetCookie("OPFrete"+FC$.IDLoja);
    if(sOpFreteSelected==null)sOpFreteSelected="";
    var oShippingOptions1=document.getElementById("idShippingOptions1");
    var oShippingOptions2=document.getElementById("idShippingOptions2");
    var sShipping="<div class='ZipOptionsCart'><select onchange=\"fnChangeFreteCart(this,'"+iValorCesta+"')\"><option>"+ rk("shipping-options") +"</option>";
    var dAgora=new Date();
    console.log("===== Regular cart [ "+ (dAgora.getDate() +"/"+(dAgora.getMonth()+1)+"/"+dAgora.getFullYear()+" "+ dAgora.getHours()+":"+dAgora.getMinutes()+":"+dAgora.getSeconds()) +" ] =====");
    console.log("Qtd de opções: "+ iOpt);
    for(var i=1;i<=iOpt;i++){
      var OptName=ReadXMLNode(obj,"Opt"+ i +"Name");
      var OptImage=ReadXMLNode(obj,"Opt"+ i +"Image");
      var OptObs=ReadXMLNode(obj,"Opt"+ i +"Obs");if(OptObs==null)OptObs="";
      var sValorFrete=ReadXMLNode(obj,"Opt"+ i +"Value");
      var bCurrentOptionSelected=((OptName==sOpFreteSelected) || (sOpFreteSelected=="" && i==1));
      //regular cart
      console.log("1) i="+i+" bCurrentOptionSelected="+ bCurrentOptionSelected+" OptName="+ OptName+" sOpFreteSelected="+ sOpFreteSelected +" iOpt="+iOpt +" bAlredySelectedOption="+ bAlredySelectedOption);
      if(sF$.fnGetConfig("Cart_ZipCode_Price_Side_Cart")){
        if(sValorFrete==FCLib$.formatMoney(0,FC$.Currency).replace(/&nbsp;/," ") && sOpFreteSelected=="" && i==1){
          bCurrentOptionSelected=false;
        }
        else if(sOpFreteSelected=="" && i==2 && !bAlredySelectedOption){
          bCurrentOptionSelected=true;
        }
      };
      console.log("2) i="+i+" bCurrentOptionSelected="+ bCurrentOptionSelected +" bAlredySelectedOption="+ bAlredySelectedOption);
      if(bCurrentOptionSelected){sValFreteAtual=sValorFrete;bAlredySelectedOption=true;}
      sShipping+="<option value='"+ sValorFrete +"'"+ (bCurrentOptionSelected?" selected":"") +">"+ OptName +" ["+ sValorFrete +"]</option>";
      console.log("Opção "+ i +": ["+ OptName +"] "+ sValorFrete +" Atual:"+ bCurrentOptionSelected);
    }
    sShipping+="</select></div>";
    oShippingOptions1.innerHTML=sShipping;
    oShippingOptions2.innerHTML=sShipping;
    oShippingOptions1.style.display="block";
    oShippingOptions2.style.display="block";
  }
  if(sValFreteAtual==""){
    sValFreteAtual=ReadXMLNode(obj,"Opt1Value");
    FCLib$.SetCookie("OPFrete"+FC$.IDLoja,"");
  }  
  console.log("Nome da última opção de frete selecionada: ["+ sOpFreteSelected +"]");
  console.log("Valor do frete atual: "+ sValFreteAtual);
  fnShowFreteCart(sValFreteAtual,iValorCesta);
}

  function fnChangeFreteCart(obj,iValorCesta){
    var iOpFrete=obj.selectedIndex;
    if(iOpFrete>0){
      var sOpFrete=obj.options[obj.selectedIndex].text;
      var iPos=sOpFrete.indexOf(" [");
      if(iPos>0)sOpFrete=sOpFrete.substring(0,iPos);
      FCLib$.SetCookie("OPFrete"+FC$.IDLoja,sOpFrete);
      console.log("Nova opção de frete: ["+ sOpFrete +"] Valor de "+ obj.options[obj.selectedIndex].value);
      fnShowFreteCart(obj.options[obj.selectedIndex].value,iValorCesta);
    }
  }
  
function fnShowFreteCart(OptValue,iValorCesta){
  var oShippingObs1=document.getElementById("idShippingObs1");
  var oShippingObs2=document.getElementById("idShippingObs2");
  var oShippingValue1=document.getElementById("idShippingValue1");
  var oShippingValue2=document.getElementById("idShippingValue2");

  /* oShippingObs1.innerHTML="<b>"+ OptName +"</b><br><span class=ObsFreightCalc>"+ OptObs +"</span>"; */
  /* oShippingObs2.innerHTML="<b>"+ OptName +"</b><br><span class=ObsFreightCalc>"+ OptObs +"</span>"; */
  oShippingObs1.innerHTML="<b>"+ rk("process-xml-cep-shipping") +"</b>";
  oShippingObs2.innerHTML="<b>"+ rk("process-xml-cep-shipping") +"</b>";

  oShippingValue1.innerHTML=OptValue;oShippingValue1.style.display="block";
  oShippingValue2.innerHTML=OptValue;oShippingValue2.style.display="block";
  var oImgLoadingCEP1=document.getElementById("idImgLoadingCEP1");
  if(oImgLoadingCEP1){oImgLoadingCEP1.style.display="none";}
  var oImgLoadingCEP2=document.getElementById("idImgLoadingCEP2");
  if(oImgLoadingCEP2){oImgLoadingCEP2.style.display="none";}
  /* Remove elements */
  var oFCCartTotalCalc=document.getElementById("FCCartTotalCalc");
  if(oFCCartTotalCalc){oFCCartTotalCalc.parentNode.removeChild(oFCCartTotalCalc);}
  var oFCCartSmallTotalPrice=document.getElementById("FCCartSmallTotalPrice");
  if(oFCCartSmallTotalPrice){oFCCartSmallTotalPrice.parentNode.removeChild(oFCCartSmallTotalPrice);}
  /* Total displays with shipping */
  if(FC$.Language==1)var iValFrete=OptValue.replace(FC$.Currency +" ","").replace(",","");
  else var iValFrete=OptValue.replace(FC$.Currency +" ","").replace(",",".");
  var iTotalCesta=parseFloat(iValorCesta)+parseFloat(iValFrete);
  /* Inserts totals in main table */
  var oLocalInsert=document.getElementById("FCCartWrapTotal"); /* If you have packaging, try to use this position first */
  if(!oLocalInsert)oLocalInsert=document.getElementById("FCCartSubtotalPrice");
  if(!oLocalInsert)oLocalInsert=document.getElementById("FCCartSubtotals");
  if(oLocalInsert){
    var oNewElement=document.createElement("tr");
    oNewElement.setAttribute("id","FCCartTotalCalc");
    oNewElement.setAttribute("class","not-on-small");
    if(document.getElementById("idColPesoFC"))var sColspan=" colspan=2"; else var sColspan="";
    oNewElement.innerHTML="<td colspan=3 align=right><b>Total:</b></td><td align=right"+ sColspan +"><b>"+ FCLib$.formatMoney(iTotalCesta,FC$.Currency) +"</b></td>";
    fnInsertAfter(oNewElement,oLocalInsert);
  }
  /* Insert totals in small table */
  var oLocalInsert=document.getElementById("FCCartSmallWrapTotal");
  if(!oLocalInsert)oLocalInsert=document.getElementById("FCCartSmallSubtotalPrice");
  if(!oLocalInsert)oLocalInsert=document.getElementById("FCCartSmallSubtotals");
  if(oLocalInsert){
    var oNewElement=document.createElement("div");
    oNewElement.setAttribute("id","FCCartSmallTotalPrice");
    oNewElement.innerHTML="<ul><li class='FCCartSubtotalPriceLabel'>Total:</li><li class='FCCartSubtotalPriceValue'><b>"+ FCLib$.formatMoney(iTotalCesta,FC$.Currency) +"</b></li></ul>";
    fnInsertAfter(oNewElement,oLocalInsert);
  }
}

function fnInsertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

/* Shipping Calculation in shopping cart */
function fnButCupom(){
  var oCupom=document.getElementById("Cupom");
  if(oCupom){
    var oNewElement=document.createElement("span");
    oNewElement.innerHTML="&nbsp;<button id='FCCartCupomBut' type='submit' onclick=\"document.Lista.Buy.value='';\">"+ rk("cart-enter-coupon-button") +"</button>";
    fnInsertAfter(oNewElement,oCupom);
  }
}

/* Save Cart/Checkout Design */
var SaveCart$=(function(){

  var iErr=0;
  var sMsg="";

  function fnShowSaveCart(){
    var oSaveCartDesign=document.getElementById("SaveCartDesign");
    if(!oSaveCartDesign)FCLib$.fnAjaxExecFC(FCLib$.uk("url-cart-list"),"format=1&n=20",false,fnProcessSaveCart,iErr,sMsg);
  }

  function fnProcessSaveCart(oHTTP,iErr,sMsg){
    var sHTTP=oHTTP.responseText;
    if(sHTTP!=""){
      var oJSON=null;
      try{oJSON=JSON.parse(sHTTP);}
      catch(e){console.log("invalid JSON from /cartlist");}
      if(oJSON)fnShowSaveCartDesign(oJSON,iErr,sMsg);
    }
    else{console.log("blank response from /cartlist");}
  }

  function fnShowSaveCartDesign(oJSON,iErr,sMsg){
    if(oJSON.msg!=undefined){
      if(oJSON.msg!=""){console.log("msg "+oJSON.msg)};
    }
    else{  
      var sCont="";
      var currencyProdCart=oJSON.currency;
      var totalProds=oJSON.totalProds;
      var totalProdsOri=oJSON.totalProdsOri;
      var ValProds=oJSON.totalProdsNum;
      var ValProdsOri=oJSON.totalProdsOriNum;
      /* Displays total saved */
      if(ValProdsOri!=ValProds){ /* if the value of the products without promotion is different from the value that is in the basket displays value saved */
        sCont+="<div class=SaveProdCart style='background:#2d9621;padding:10px;text-align:center;'><span style='font-weight:bold;color:#fcfcfc;font-size:13px;'>"+ rk("side-cart-shopping-save") +" "+ FCLib$.formatMoney((ValProdsOri-ValProds),currencyProdCart) +"</span></div>";
        if(FC$.Page="Checkout"){var oInsert=document.getElementById("idCartItemsFC");}
        if(FC$.Page="Cart"){var oInsert=document.getElementById("TabItens");}
        if(oInsert){
          var oNewElement=document.createElement("div");
          oNewElement.setAttribute("id","SaveCartDesign");
          oNewElement.setAttribute("class","save-cart-design");
          var oSaveCartDesign=oInsert.parentNode.insertBefore(oNewElement,oInsert);
          oSaveCartDesign.innerHTML=sCont;
        }
      }
    }
  }
  
  return{
    fnShowSaveCart:fnShowSaveCart
  }
})();

/* Cart Design Right bar */
var Cart$=(function(){

  function fnShowCartCheckout(oRet,iErr,sMsg){
    if(FC$.Page=="Cart")
      var oObj=document.getElementById("idTitTextoFC");
      if(oObj)oObj.scrollIntoView();
    else{
      FCLib$.fnAjaxExecFC(FCLib$.uk("url-cart-list"),"format=1&n=20&d=1",false,fnProcessShowCart,iErr,sMsg);
    }
  }

  function fnProcessShowCart(oHTTP,iErr,sMsg){
    var sHTTP=oHTTP.responseText;
    if(sHTTP!=""){
      var oJSON=null;
      try{oJSON=JSON.parse(sHTTP);}
      catch(e){console.log("invalid JSON from /cartlist");}
      if(oJSON)fnShowCartDesign(oJSON,iErr,sMsg);
    }
    else{console.log("blank response from /cartlist");}
  }

  function fnShowCartDesign(oJSON,iErr,sMsg){
    var sProdutosNaCesta=""
    var sFinalCart="";
    iItensCesta=0;
    if(oJSON.msg!=undefined){
      if(oJSON.msg!=""){console.log("msg "+oJSON.msg)}
    }
    else{  
      var currencyProdCart=oJSON.currency;
      var TotalQtyProdCart=oJSON.TotalQty;
      var subtotalProdCart=oJSON.subtotal;
      var ValCesta=oJSON.subtotalNum;
      var totalProds=oJSON.totalProds;
      var totalProdsOri=oJSON.totalProdsOri;
      var ValProds=oJSON.totalProdsNum;
      var ValProdsOri=oJSON.totalProdsOriNum;
      var totalWrapValue=oJSON.totalWrapValue;
      iItensCesta=TotalQtyProdCart;
      var oItems=oJSON.items;
      var iQtdProdsXML=oItems.length;
      for(i=0;i<iQtdProdsXML;i++){
        //console.log("oItems",i,oItems[i]);
        var sProdAtual="";
        var ImgProdCart=oItems[i].image;
        var NomeProdCart=oItems[i].prod;
        var qtyProdCart=oItems[i].qty;
        var priceProdCart=oItems[i].price;
        var priceOriProdCart=oItems[i].priceOri;
        var ValPriceProdCart=oItems[i].priceNum;
        var ValPriceOriProdCart=oItems[i].priceOriNum;
        var saleProdCart=oItems[i].sale;
        var idProdCart=oItems[i].id;
        var idProdPed=oItems[i].iditem;
        var cor=oItems[i].cor; if(cor==undefined)cor="";
        var fil=oItems[i].fil; if(fil==undefined)fil="";
        var d1=oItems[i].d1; if(d1==undefined)d1="";
        var d2=oItems[i].d2; if(d2==undefined)d2="";
        var d3=oItems[i].d3; if(d3==undefined)d3="";
        var s1=oItems[i].s1; if(s1==undefined)s1="";
        var s2=oItems[i].s2; if(s2==undefined)s2="";
        var s3=oItems[i].s3; if(s3==undefined)s3="";
        var wrap=oItems[i].wrap; if(wrap==undefined)wrap=false;
        var wrapValue=oItems[i].wrapValue; if(wrapValue==undefined)wrapValue=0;
        /* Product information */
        sProdAtual+="<div id='DivItem"+ idProdPed +"' class='CartDesign-product-container'>";
        sProdAtual+="  <div class='CartDesign-product-img'>";
        sProdAtual+="    <div class='ImgProdCart'><a href='"+ FCLib$.uk("url-prod") +"?"+ (FCLib$.fnUseEHC()?"productid":"idproduto") +"="+ idProdCart +"'><img src='"+ ImgProdCart +"' border='0'></a></div>";
        sProdAtual+="  </div>";
        sProdAtual+="  <div class='CartDesign-product-info-container'>";
        sProdAtual+="    <div class='CartDesign-product-info-name-delete'>";
        sProdAtual+="      <div class='CartDesign-product-info-name'>";
        sProdAtual+="        <a href='"+ FCLib$.uk("url-prod") +"?"+ (FCLib$.fnUseEHC()?"productid":"idproduto") +"="+ idProdCart +"'>"+ NomeProdCart +"</a>";
        sProdAtual+="      </div>";
        sProdAtual+="      <div class='CartDesign-product-info-delete'>";
        sProdAtual+="        <img title='Remover item da cesta' src='"+ FC$.PathImg +"delete_off.svg?cccfc=1' onmouseover='this.src=FC$.PathImg+\"delete.svg\"' onmouseout='this.src=FC$.PathImg+\"delete_off.svg\"' width=16 onclick='Cart$.fnRemoveProd("+ idProdPed +");'>";
        sProdAtual+="      </div>";
        sProdAtual+="    </div>";        
        sProdAtual+="    <div class='CartDesign-product-info-desc'>";
        sProdAtual+="     "+ cor +" "+ fil +" "+ d1 +" "+ d2 +" "+ d3 +" "+ s1 +" "+ s2 +" "+ s3 +"";
        sProdAtual+="    </div>";
        sProdAtual+="    <div class='CartDesign-product-info-qty-price'>";
        sProdAtual+="      <div class='CartDesign-product-info-qty QtdProdCart'>";
        sProdAtual+="        <div class=QtdMenos onclick='Cart$.fnChangeQtdProd("+ idProdCart +","+ idProdPed +",false);'>-</div>";
        sProdAtual+="        <div class=QtdVal id=QtdVal"+ idProdPed +">"+ qtyProdCart +"</div>";
        sProdAtual+="        <div class=QtdMais onclick='Cart$.fnChangeQtdProd("+ idProdCart +","+ idProdPed +",true);'>+</div>";
        sProdAtual+="      </div>";
        sProdAtual+="      <div class='CartDesign-product-info-price'>";
        sProdAtual+="        "+ currencyProdCart +" "+ priceProdCart;   
        if(priceProdCart!=priceOriProdCart)sProdAtual+="<br><span style='color:#2d9621;font-size:12px;'>"+ rk("side-cart-shopping-save") +" "+ FCLib$.formatMoney((ValPriceOriProdCart-ValPriceProdCart),currencyProdCart) +"</span>";
        sProdAtual+="      </div>"; 
        sProdAtual+="    </div>";
        sProdAtual+="  </div>";
        sProdAtual+="</div>";
        sProdutosNaCesta=sProdAtual+sProdutosNaCesta;        
      }
      if(iQtdProdsXML>=20)sProdutosNaCesta="<div class='CartDesign-20-products'>"+ rk("side-cart-shopping-listing-20") +" <a href='111"+ FCLib$.uk("url-add-product") +"'>"+ rk("side-cart-shopping-listing-20-cart") +"</a>:</div>"+sProdutosNaCesta;

      if(sProdutosNaCesta!=""){
        sFinalCart=""; 

        /* Displays total saved */
        if(ValProdsOri!=ValProds){ /* if the value of the products without promotion is different from the value that is in the basket displays value saved */
          sFinalCart+="<div class='CartDesign-totalitens-container'>";
          sFinalCart+="<div class=TotItProdCart><span style='color:#2d9621;font-size:13px;'>"+ rk("side-cart-shopping-save") +" "+ FCLib$.formatMoney((ValProdsOri-ValProds),currencyProdCart) +"</span></div>";
          sFinalCart+="</div>";
        }

        if(totalWrapValue>0)ValCesta=ValCesta-totalWrapValue; /* if it has a gift price */
        /* If total product value is different from the calculated subtotal displays discounts */
        if(totalProds!=subtotalProdCart){
          var ValorDesconto=(ValProds-ValCesta);
          var PercDesconto=(100*(1-(ValCesta/ValProds)))+0.001;
          PercDesconto=fnArredonda(PercDesconto,2);

          /* Displays total without discounts */
          sFinalCart+="<div class='CartDesign-totalitens-container'>";
          sFinalCart+="<div class=TotItProdCart>"+ rk("side-cart-shopping-total-itens") +":</div>";
          sFinalCart+="<div class=TotItProdCartValor>&nbsp;&nbsp;"+ FCLib$.formatMoney(ValProds,currencyProdCart) +"</div>";
          sFinalCart+="</div>";
          /* Displays discounts */
          if(ValorDesconto>0){
            sFinalCart+="<div class='CartDesign-descontos-container'>";
            sFinalCart+="<div class=DescProdCart>"+ rk("side-cart-shopping-discount") +" ("+ PercDesconto +"%):</div>";
            sFinalCart+="<div class=DescProdCartValor>&nbsp;-&nbsp;"+ FCLib$.formatMoney(ValorDesconto,currencyProdCart) +"</div>";
            sFinalCart+="</div>";
          }
        }       
        /* Displays packaging */
        if(totalWrapValue>0){
          sFinalCart+="<tr>";
          sFinalCart+="<td colspan=3 align=right class=TotItProdCart>"+ rk("side-cart-shopping-gift") +":</td>";
          sFinalCart+="<td colspan=2 align=right class=TotItProdCartValor>&nbsp;&nbsp;"+ FCLib$.formatMoney(totalWrapValue,currencyProdCart) +"</td>";
          sFinalCart+="</tr>";
        }
        /* Displays Subtotal */
        sFinalCart+="<div class='CartDesign-product-subtotal-container-separator'><div class='CartDesign-product-subtotal-container'>";
        sFinalCart+="  <div class='CupomProdCart'>";
        sFinalCart+="    <button id='idButCup' type='submit' class='InputButton' onclick='Cart$.fnGoCupom();'>"+ rk("side-cart-shopping-enter-coupon-button") +"</button>";
        sFinalCart+="  </div>";
        sFinalCart+="  <div class='CartDesign-product-subtotal-price'>";
        sFinalCart+=rk("side-cart-shopping-subtotal");
        sFinalCart+="    &nbsp;"+ FCLib$.FormatPreco(currencyProdCart +" "+ subtotalProdCart) +"";
        sFinalCart+="  </div>";
        sFinalCart+="</div></div>";        
        /* Enter shipping calculation if store has configured by zip code */
        if(FC$.TypeFrt==3 || FC$.TypeFrt==4){           
          sFinalCart+="<div id='FCCartTotalFreight' class='CartDesign-product-zipcode-container'>";
          sFinalCart+="  <div class='CartDesign-product-zipcode-field'>";
          sFinalCart+="    <span>"+ rk("side-cart-shopping-zip-code") +"</span> <input type=text id=idZipC size=10 maxlength=9 class=InputText><button id='idButC' type='submit' class=InputButton onclick='Cart$.fnGetShippingValueCart(\""+subtotalProdCart+"\")'>"+ rk("side-cart-shopping-zip-code-button") +"</button>";
          sFinalCart+="    <span id=idShippingObs></span><span id=idShippingOptions></span>";
          sFinalCart+="  </div>";
          sFinalCart+="  <div class='CartDesign-product-zipcode-price'>";
          sFinalCart+="    <span id=idShippingValue>"+ rk("side-cart-shopping-zip-code-to-calculate") +"</span><img src='/images/loading.gif' vspace=3 style='display:none' id=idImgLoadingCEP>";
          sFinalCart+="  </div>";
          sFinalCart+="</div>";
        }
        /* Installment */
        sFinalCart+="<div id='FCCartTotalParcCalc' class='ParcProdCart'>"+ fnMontaMaxParcelaCart(ValCesta) +"</div>";
        /* Shopping cart button */
        /* sFinalCart+="<div class=ProdCartGo><a href='"+ FCLib$.uk("url-add-product") +"'>IR PARA O CARRINHO</a></div>"; */
        /* Shopping cart payment */
        sFinalCart+="<div class='ProdCartPagto'><a href='"+ FCLib$.uk("url-checkout") +"'>"+ rk("side-cart-shopping-proceed-checkout") +"</a></div>";
      }
    }
    var oCartDesign=document.getElementById("CartDesign");
    /* Inserts element (cart) if it does not exist */
    if(!oCartDesign){
      var oInsert=document.getElementById("idFCLeftContentRight");
      if(oInsert){
        var oNewElement=document.createElement("div");
        oNewElement.setAttribute("id","CartDesign");
        oNewElement.setAttribute("class","cart-design");
        oCartDesign=oInsert.parentNode.insertBefore(oNewElement,oInsert);
      }
    }

    var oBlocker=document.getElementById("Blocker");
    /* Inserts element (screen locked) if it does not exist */
    if(oBlocker){
      oBlocker.style.display="block";
    }
    else{
      var oNewElement=document.createElement("div");
      oNewElement.setAttribute("id","Blocker"); 
      oBlocker=document.body.appendChild(oNewElement);
      oBlocker.style.position="fixed";
      oBlocker.style.top="0";
      oBlocker.style.left="0";
      oBlocker.style.width="100%";
      oBlocker.style.height="100%";
      oBlocker.style.zIndex ="1109";  /* #CartDesign has 1110 zIndex // Vex alert has 1111 */
      oBlocker.style.cursor="pointer";
      oBlocker.style.backgroundColor="rgba(51, 51, 51, 0.50)";
      oBlocker.onclick=fnCloseBloker;
    }

    document.onkeyup=function(e){
      e=e||window.event;
      if(e.keyCode==27){
        Cart$.fnCloseCartDesign();
      }
    };

    var bTemProds=true;
    if(sProdutosNaCesta==""){bTemProds=false;sProdutosNaCesta+="<div class='CartDesign-empty'>"+ rk("side-cart-shopping-empty") +".</div>";}
    
    /* If error occurred while including error message displays. If no error occurs it does not show the message */
    if(iErr>0 && sMsg!=""){sProdutosNaCesta="<div id=DivMsgCart><div style='color:"+(iErr>0?"#ffffff":"#ffffff") +";background:"+(iErr>0?"#b61f24":"#1a75d7") +";'>"+ sMsg +"</div></div>"+sProdutosNaCesta;}

    var sTopo="<div class='CartDesign-header'>";
          sTopo+="<div class='CartDesign-header-title'>";
            sTopo+="<a style='color:#fff;' href='"+ FCLib$.uk("url-add-product") +"'>"+ rk("side-cart-shopping-cart-title") +"";
            if(iItensCesta>0)sTopo+="&nbsp; [ <span>"+ iItensCesta +" "+ ((iItensCesta>1)?""+ rk("side-cart-shopping-items") +"":""+ rk("side-cart-shopping-item") +"") +"</span> ]";
            sTopo+="</a>";
          sTopo+="</div>";
          sTopo+="<div class='CartDesign-header-close'>";
            sTopo+="<img src='"+ FC$.PathImg +"icon-bot-close-cart.svg?cccfc=1' alt='close cart' onclick='Cart$.fnCloseCartDesign();' style='cursor:pointer;'>";   
          sTopo+="</div>";
        sTopo+="</div>";    
    
    /* Cart */
    var sContCart=sTopo;
    sContCart+="<div id=idContentItensCart class=ContentItensCart>"+ sProdutosNaCesta +"</div>";
    if(sFinalCart!="")sContCart+="<div id='TabFinalCart' class='EstTabFinalCart'>"+ sFinalCart +"</div>";
    
    /* Inserts the cart element */
    oCartDesign.innerHTML=sContCart;

    /* Show cart (option with animation) */
    if(oCartDesign){
      oCartDesign.style.WebkitAnimation = "cartSlideOpen 1s forwards";
      oCartDesign.style.animation = "cartSlideOpen 1s forwards";          
    }

    /* Changes size and position depending on width */
    /* var iClientWidth=document.documentElement.clientWidth;
    if(iClientWidth<350){oCartDesign.style.width="320px";}
    if(iClientWidth<440){oCartDesign.style.top="0px";}
    var iClientHeight=document.documentElement.clientHeight;
    if(iClientHeight<590){
      var oContentItensCart=document.getElementById("idContentItensCart");
      if(oContentItensCart)oContentItensCart.style.maxHeight="215px";
    }*/

    /* If it is not empty, it carries shipping calculation function */
    if((FC$.TypeFrt==3 || FC$.TypeFrt==4) && bTemProds)fnGetCEP(subtotalProdCart); 

    /* Update cart top */
    fnUpdateCartTop(iItensCesta,currencyProdCart,subtotalProdCart);

    /* Remove product message added to cart or product not added */
    setTimeout(function(){
      if(document.getElementById('DivMsgCart')){
        oCartDesign.style.WebkitAnimation = "cartSlideCloseAuto 1s forwards";
        oCartDesign.style.animation = "cartSlideCloseAuto 1s forwards";          
      }
    },2000);
    
  }

  function fnUpdateCartTop(iItensCesta,currencyProdCart,subtotalProdCart){
    if(currencyProdCart==undefined)currencyProdCart=FC$.Currency;
    if(subtotalProdCart==undefined)subtotalProdCart="0,00";
    var oCartItemsTop=document.getElementById("idCartItemsTop");if(oCartItemsTop)oCartItemsTop.innerHTML=iItensCesta;
    var oCartItemsToolTop=document.getElementById("idCartItemsToolTop");if(oCartItemsToolTop)oCartItemsToolTop.innerHTML=iItensCesta;
    var oCartTotalTop=document.getElementById("idCartTotalTop");if(oCartTotalTop)oCartTotalTop.innerHTML=FCLib$.FormatPreco(currencyProdCart +" "+ subtotalProdCart);
    var oCartTotalToolTop=document.getElementById("idCartTotalToolTop");if(oCartTotalToolTop)oCartTotalToolTop.innerHTML=FCLib$.FormatPreco(currencyProdCart +" "+ subtotalProdCart);   
  }

  function fnCloseBloker(){
    var oBlocker=document.getElementById("Blocker");
    if(oBlocker)oBlocker.style.display="none";
    fnCloseCartDesign();
  }
  
  function fnCloseCartDesign(){
    var oCartDesign=document.getElementById("CartDesign");   
    if(oCartDesign){
      /* Hide cart (option with animation) */
      oCartDesign.style.WebkitAnimation = "cartSlideCloseBtn 1s forwards";
      oCartDesign.style.animation = "cartSlideCloseBtn 1s forwards";   
    }
    var oBlocker=document.getElementById("Blocker");
    if(oBlocker)oBlocker.style.display="none";
    document.onkeyup=null;
  }

  function fnArredonda(Val,iCasas) {
    iCasas=typeof iCasas!=='undefined'?iCasas:2;
    return +(Math.floor(Val+('e+'+iCasas))+('e-'+iCasas));
  };

  function fnGoCupom(){
    if(confirm(""+ rk("checkout-enter-discount-coupon-text") +"\n\n"+ rk("checkout-enter-discount-coupon-redirected-text") +"")){top.location.href=FCLib$.uk("url-add-product")+"?#acupom";}
  }

  function fnChangeQtdProd(idProdCart,idProdPed,bMais){
    var oQtdValOri=document.getElementById("QtdVal"+idProdPed);
    if(oQtdValOri){
      var iQtdOri=parseInt(oQtdValOri.innerHTML);
      if(bMais)var iQtd=iQtdOri+1; else var iQtd=iQtdOri-1;
      /* If inventory controls check how many you have in the product, otherwise change the direct quantity */
      if(FC$.StockControl)FCLib$.fnAjaxExecFC(FCLib$.uk("url-product-info"),"idprod="+ idProdCart +"&format=1",false,fnChangeQtdProdStock,idProdPed,iQtd,iQtdOri);
      else fnChangeQtdProdExec(idProdPed,iQtd);
    }
  }

  function fnChangeQtdProdStock(oHTTP,idProdPed,iQtdSolic,iQtdOri){
    var sMsgErr="";
    var iQtdProd=null;
    var sHTTP=oHTTP.responseText;
    var bLeuEstoque=false;
    if(sHTTP!=""){
      var oJSON=null;
      try{oJSON=JSON.parse(sHTTP);}
      catch(e){console.log("invalid JSON from /infoprod");}
      if(oJSON){iQtdProd=oJSON.qtd;bLeuEstoque=(iQtdProd!=undefined);}
    }
    else{console.log("blank response from /infoprod");}
    /* console.log("bLeuEstoque:"+bLeuEstoque); */
    if(bLeuEstoque){
      if(iQtdProd<iQtdOri){
        iQtdSolic=iQtdProd; /* if the original quantity is greater than the quantity in stock, the quantity requested is the quantity of the product */
        if(iQtdSolic==0){sMsgErr=""+ rk("product-has-been-removed-from-cart") +"";}
        else {sMsgErr=""+ rk("quantity-changed-quantity-stock") +" "+ iQtdProd;}
      }
    }
    else{
      iQtdProd=iQtdSolic; /* If you can not read product stock, use the requested stock */
    }
    if(iQtdSolic<=iQtdProd)fnChangeQtdProdExec(idProdPed,iQtdSolic); else sMsgErr=""+ rk("unfortunately-not-have") +" "+ iQtdSolic +" "+ rk("unfortunately-not-have-units-stock") +"";
    if(sMsgErr!="")alert(sMsgErr);
  }

  function fnChangeQtdProdExec(idProdPed,iQtdSolic){
    fnInsertLoading(idProdPed);
    if(iQtdSolic==0)var sMsg=""+ rk("change-qty-product-removed") +""; else var sMsg=""+ rk("change-qty-amount-changed") +"";
    AjaxExecFC(FCLib$.uk("url-recalculate"),"q"+ idProdPed +"="+iQtdSolic,false,fnShowCartCheckout,0,sMsg); 
  }

  function fnRemoveProd(idProdPed){
    fnInsertLoading(idProdPed);
    AjaxExecFC(FCLib$.uk("url-recalculate"),"q"+ idProdPed +"=0",false,Cart$.fnShowCartCheckout,0,""+ rk("change-qty-cart-product-removed") +"");
  }

  function fnInsertLoading(idProdPed){
    var oObj=document.getElementById("DivItem"+idProdPed);
    var sH="112";/* Default height */
    var sM="28";/* Standard margin top */
    var iHeight=oObj.offsetHeight;
    if(iHeight && iHeight>0){sH=iHeight-1;sM=((iHeight-50)/2);}
    if(oObj)oObj.innerHTML="<div style='width:100%;height:"+ sH +"px;text-align:center;'><img style='margin-top:"+ sM +"px;' src=/images/loading_ajax.gif></div>"
  }

  function fnGetCEP(iValorCesta){
    /* Zip code in cookie */
    var sNumCEP=FCLib$.GetCookie("CEP"+FC$.IDLoja);
    if(sNumCEP && sNumCEP!=""){
      document.getElementById("idZipC").value=sNumCEP;
      fnGetShippingValueCart(iValorCesta);
    }
  }
   
  function fnGetShippingValueCart(iValorCesta){
    var oShippingOptions=document.getElementById("idShippingOptions");
    if(oShippingOptions)oShippingOptions.innerHTML="";
    var sCEP=document.getElementById("idZipC").value;
    FCLib$.SetCookie("CEP"+FC$.IDLoja,sCEP);
    if(sCEP==""){document.getElementById("idShippingValue").innerHTML="<span style=color:#990000;>"+ rk("side-cart-shopping-zip-code-invalid") +"</span>";}
    else{
      document.getElementById("idShippingValue").innerHTML="";
      var oImgLoadingCEP=document.getElementById("idImgLoadingCEP");
      if(oImgLoadingCEP){oImgLoadingCEP.style.display="";}
      AjaxExecFC(FCLib$.uk("url-xml-shipping-cep"),"cep="+ sCEP,false,fnProcessXMLCEPCart,iValorCesta);
    }
  }
  
  function fnProcessXMLCEPCart(obj,iValorCesta){
    var oShippingObs=document.getElementById("idShippingObs");
    var oShippingValue=document.getElementById("idShippingValue");
    oShippingObs.innerHTML="";
    oShippingValue.innerHTML="";
    var iErr=ReadXMLNode(obj,"err");if(iErr==null)return;
    if(iErr!="0"){
      var oImgLoadingCEP=document.getElementById("idImgLoadingCEP");
      if(oImgLoadingCEP){oImgLoadingCEP.style.display="none";}
      oShippingValue.innerHTML="<span id=idErrXMLCEPFC style=color:#990000;>"+ ReadXMLNode(obj,"msg") +"</span>";
      return;
    }
    var sValFreteAtual="";
    var sOpFreteSelected="";
    var iOpt=ReadXMLNode(obj,"OptQt");
    if(iOpt>1){
      var bAlredySelectedOption=false;
      sOpFreteSelected=FCLib$.GetCookie("OPFrete"+FC$.IDLoja);
      if(sOpFreteSelected==null)sOpFreteSelected="";
      var oShippingOptions=document.getElementById("idShippingOptions");
      var sShipping="<div class='ZipOptionsCart'><select onchange=\"Cart$.fnChangeFrete(this,'"+iValorCesta+"')\"><option>"+ rk("shipping-options") +"</option>";
      var dAgora=new Date();
      console.log("===== Side cart [ "+ (dAgora.getDate() +"/"+(dAgora.getMonth()+1)+"/"+dAgora.getFullYear()+" "+ dAgora.getHours()+":"+dAgora.getMinutes()+":"+dAgora.getSeconds()) +" ] =====");
      console.log("Qtd de opções: "+ iOpt);
      for(var i=1;i<=iOpt;i++){
        var OptName=ReadXMLNode(obj,"Opt"+ i +"Name");
        var OptImage=ReadXMLNode(obj,"Opt"+ i +"Image");
        var OptObs=ReadXMLNode(obj,"Opt"+ i +"Obs");if(OptObs==null)OptObs="";
        var sValorFrete=ReadXMLNode(obj,"Opt"+ i +"Value");
        var bCurrentOptionSelected=((OptName==sOpFreteSelected) || (sOpFreteSelected=="" && i==1));
        //side cart
        console.log("1) i="+i+" bCurrentOptionSelected="+ bCurrentOptionSelected+" OptName="+ OptName+" sOpFreteSelected="+ sOpFreteSelected +" iOpt="+iOpt +" bAlredySelectedOption="+ bAlredySelectedOption);
        if(sF$.fnGetConfig("Cart_ZipCode_Price_Side_Cart")){
          if(sValorFrete==FCLib$.formatMoney(0,FC$.Currency).replace(/&nbsp;/," ") && sOpFreteSelected=="" && i==1){
            bCurrentOptionSelected=false;
          }
          else if(sOpFreteSelected=="" && i==2 && !bAlredySelectedOption){
            bCurrentOptionSelected=true;
          }
        };
        console.log("2) i="+i+" bCurrentOptionSelected="+ bCurrentOptionSelected +" bAlredySelectedOption="+ bAlredySelectedOption);
        if(bCurrentOptionSelected){sValFreteAtual=sValorFrete;bAlredySelectedOption=true;}
        sShipping+="<option value='"+ sValorFrete +"'"+ (bCurrentOptionSelected?" selected":"") +">"+ OptName +" ["+ sValorFrete +"]</option>";
        console.log("Opção "+ i +": ["+ OptName +"] "+ sValorFrete +" Atual:"+ bCurrentOptionSelected);
        console.log("=======================");
      }
      sShipping+="</select></div>";
      oShippingOptions.innerHTML=sShipping;
      oShippingOptions.style.display="block";
    }
    if(sValFreteAtual==""){
      sValFreteAtual=ReadXMLNode(obj,"Opt1Value");
      FCLib$.SetCookie("OPFrete"+FC$.IDLoja,"");
    }  
    console.log("Nome da última opção de frete selecionada: ["+ sOpFreteSelected +"]");
    console.log("Valor do frete atual: "+ sValFreteAtual);
    fnShowFrete(sValFreteAtual,iValorCesta);
  }

  function fnChangeFrete(obj,iValorCesta){
    var iOpFrete=obj.selectedIndex;
    if(iOpFrete>0){
      var sOpFrete=obj.options[obj.selectedIndex].text;
      var iPos=sOpFrete.indexOf(" [");
      if(iPos>0)sOpFrete=sOpFrete.substring(0,iPos);
      FCLib$.SetCookie("OPFrete"+FC$.IDLoja,sOpFrete);
      console.log("Nova opção de frete: ["+ sOpFrete +"] Valor de "+ obj.options[obj.selectedIndex].value);
      fnShowFrete(obj.options[obj.selectedIndex].value,iValorCesta);
    }
  }

  function fnShowFrete(OptValue,iValorCesta){
    console.log("Calculando com o valor "+OptValue);
    var oShippingObs=document.getElementById("idShippingObs");
    var oShippingValue=document.getElementById("idShippingValue");
    oShippingObs.innerHTML="";
    oShippingValue.innerHTML="";
    /* oShippingObs.innerHTML="<b>"+ OptName +"</b><br><span class=ObsFreightCalc>"+ OptObs +"</span>"; */
    oShippingValue.innerHTML=OptValue;
    oShippingValue.style.display="block";
    var oImgLoadingCEP=document.getElementById("idImgLoadingCEP");
    if(oImgLoadingCEP){oImgLoadingCEP.style.display="none";}
    /* Removes elements */
    var oFCCartTotalCalc=document.getElementById("FCCartTotalCalc");
    if(oFCCartTotalCalc){oFCCartTotalCalc.parentNode.removeChild(oFCCartTotalCalc);}
    var oFCCartTotalParcCalc=document.getElementById("FCCartTotalParcCalc");
    if(oFCCartTotalParcCalc){oFCCartTotalParcCalc.parentNode.removeChild(oFCCartTotalParcCalc);}
    /* Displays total with shipping */
    if(FC$.Language==1){
      var iValFrete=OptValue.replace(FC$.Currency +" ","").replace(",","");
      iValorCesta=iValorCesta.replace(",","");
    }
    else{
      var iValFrete=OptValue.replace(FC$.Currency +" ","").replace(",",".");
      iValorCesta=iValorCesta.replace(".","").replace(",",".");
    }
    var iTotalCesta=parseFloat(iValorCesta)+parseFloat(iValFrete);
    /* Enter totals in the main table */
    var oLocalInsert=document.getElementById("FCCartTotalFreight");
    if(oLocalInsert){
      var oNewElement=document.createElement("div");
      oNewElement.setAttribute("id","FCCartTotalCalc");
      oNewElement.innerHTML="<div class='CartDesign-totalcart-container'><div class='TotalFProdCart'>"+ rk("side-cart-shopping-zip-code-total-pay") +":</div><div class='TotalFProdCartValor'>&nbsp;&nbsp;"+ FCLib$.formatMoney(iTotalCesta,FC$.Currency) +"</div></div>";
      fnInsertAfter(oNewElement,oLocalInsert);
    }
    /* Inserts installment in main table */
    var oLocalInsert=document.getElementById("FCCartTotalCalc");
    if(oLocalInsert){
      var oNewElement=document.createElement("tr");
      oNewElement.setAttribute("id","FCCartTotalParcCalc");
      if(document.getElementById("idColPesoFC"))var sColspan="5"; else var sColspan="4";
      oNewElement.innerHTML="<td colspan=5 align=right class=ParcProdCart>"+ fnMontaMaxParcelaCart(iTotalCesta) +"</td>";
      fnInsertAfter(oNewElement,oLocalInsert);
    }
  }


  function fnMontaMaxParcelaCart(Valor){
    if(typeof Juros!="undefined"){
      return rk("side-cart-shopping-interest-1") + Juros.length + rk("side-cart-shopping-interest-2") +" "+ FCLib$.formatMoney(CalculaParcelaJurosCompostos(Valor,Juros.length),FC$.Currency);
    }
    else {
      return "";
    }

  }

  return{
    fnShowCartCheckout:fnShowCartCheckout,
    fnRemoveProd:fnRemoveProd,
    fnGetShippingValueCart:fnGetShippingValueCart,
    fnCloseCartDesign:fnCloseCartDesign,
    fnChangeQtdProd:fnChangeQtdProd,
    fnChangeFrete:fnChangeFrete,
    fnGoCupom:fnGoCupom
  }

})();

/* Footer Accordion Mobile */
function fnFooterAccordion(){
  var accFooter = document.getElementsByClassName("footer-accordion");
  var iFooter;
  for (iFooter = 0; iFooter < accFooter.length; iFooter++) {
    accFooter[iFooter].addEventListener("click", function() {
      this.classList.toggle("footer-accordion-active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight){
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      } 
    });
  }
};

/* Mobile ProductList Filters */
function fnChangeDivMenuPosition(){ 
  if(FC$.Page=="Products"){
    var mediaQuery = window.matchMedia('(max-width: 1023px)');
    document.getElementById("fc-mobile-dynamic-filter").style.display=(FCLib$.pQuery?"block":"none");
    mediaQuery.addListener(mediaContentResolution);
    function mediaContentResolution(mediaQuery) {    
      if (mediaQuery.matches) {
        document.getElementById("ProductsFilterFC").style.display="none";
        setTimeout(function(){ 
          document.getElementById("ProductsFilterFC").style.display="block";
          document.getElementById('ProductsFilterFCMobile').innerHTML = document.getElementById("ProductsFilterFC").innerHTML;
          document.getElementById("ProductsFilterFC").innerHTML = "";
        },900);
      } else {
        setTimeout(function(){ 
          if(document.getElementById('ProductsFilterFCMobile').innerHTML!=""){
            document.getElementById('ProductsFilterFC').innerHTML = document.getElementById('ProductsFilterFCMobile').innerHTML;
            document.getElementById('ProductsFilterFCMobile').innerHTML = "";
          }
        },600);
      }
    }
    mediaContentResolution(mediaQuery);
  }
}
function filterOpenNav(){
  document.getElementById("filterSidenav").style.left="0px";
  document.getElementById("filter-offcanvas-overlay").style.display = "block";
  document.onkeyup=function(e){
    e=e||window.event;
    if(e.keyCode==27){
      document.getElementById("headerSidenav").style.left="-300px";
      document.getElementById("filter-offcanvas-overlay").style.display = "none";
    }
  };
}
function filterCloseNav(){
  document.getElementById("filterSidenav").style.left="-300px";
  document.getElementById("filter-offcanvas-overlay").style.display = "none";
}

/* Product Stock */
function fnGetStockProduct(sStockProduct){
  if(sF$.fnGetConfig("Product_Details_Show_Stock")){
    var productStock=document.getElementById("product-details-show-stock");
    if(sStockProduct==0){productStock.innerHTML=""}
    else if(sStockProduct<=6){
      productStock.innerHTML="<span>"+ rk("details-stock-only-text") +" <span class='product-details-show-stock-lastoff'>"+ sStockProduct +"</span> "+ rk("details-stock-in-stock-text") +" </span><br><div class='product-details-progress-bar product-details-color1 product-details-stripes'><span class='product-details-stripes-size'></span></div>"
    }
    else if(sStockProduct<=10){
      productStock.innerHTML="<span>"+ rk("details-stock-only-text") +" <span class='product-details-show-stock-lastoff'>"+ sStockProduct +"</span> "+ rk("details-stock-in-stock-text") +" </span><br><div class='product-details-progress-bar2 product-details-color2 product-details-stripes2'><span class='product-details-stripes-size2'></span></div>"
    }
    else if(sStockProduct>=11){productStock.innerHTML=""}
    else{productStock.innerHTML=""}
  }
}

/* Show Date Prom */
function fnGetDate(sDateTime,IsMMDD){
    var IsDate=false;
    var oDate=null;
    var aDateTime=sDateTime.split(' ');
    if(aDateTime.length<=2){
      var oMatchesDate=/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{2,4})$/.exec(aDateTime[0]);
      if(oMatchesDate!=null){
        if(IsMMDD){
          var m=parseInt(oMatchesDate[1]-1,10);
          var d=parseInt(oMatchesDate[2],10);
        }
        else{
          var d=parseInt(oMatchesDate[1],10);
          var m=parseInt(oMatchesDate[2]-1,10);
        }
        var y=parseInt(oMatchesDate[3],10);
        if(y<30)y+=2000;
        else if(y<100)y+=1900;
        if(aDateTime.length==2){
          var oMatchesTime=/^(\d{1,2})[:](\d{1,2})$/.exec(aDateTime[1]);
          if(oMatchesTime!=null){
            var hh=parseInt(oMatchesTime[1],10);
            var mm=parseInt(oMatchesTime[2],10);
            var oNewDate=new Date(y,m,d,hh,mm);
            IsDate=(oNewDate.getMinutes()==mm && oNewDate.getHours()==hh && oNewDate.getDate()==d && oNewDate.getMonth()==m && oNewDate.getFullYear()==y);
          }
        }
        else{
          var oNewDate=new Date(y,m,d,2);
          IsDate=(oNewDate.getDate()==d && oNewDate.getMonth()==m && oNewDate.getFullYear()==y);
        }
        if(IsDate)oDate=oNewDate;
      }
    }
    return {IsDate:IsDate, oDate:oDate};
}

function fnFormatN(n){
  n=""+n;
  if(n.length==1)n="0"+n;
  return n;
}

function fnShowDateProm(sDateTime){
  if(sF$.fnGetConfig("Product_Details_Show_Date_Promotion")){
    var oOut=document.getElementById("DataProm");
    if(oOut){
      var IsMMDD=false;
      var oGetDate=fnGetDate(sDateTime,IsMMDD);
      if(oGetDate.IsDate){
      setInterval(function() {
        var dDataPromFim=oGetDate.oDate;
        var dAgora=new Date();
        var dFaltam=(dDataPromFim-dAgora); /* retorna em milissegundos */
        var iHoras=new Date(dFaltam+10800000).getHours(); /* horas > diferença de 3 horas (+10800000) */
        var iMinutos=new Date(dFaltam+10800000).getMinutes(); /* minutos > diferença de 3 horas (+10800000) */
        var iSeconds=new Date(dFaltam+10800000).getSeconds(); /* segundos > diferença de 3 horas (+10800000) */
        dFaltam=parseInt(dFaltam/1000/60/60/24); /* quantos dias restam para acabar a promoção */
        if(dDataPromFim>dAgora && dFaltam<10){ /* só exibe informação quando faltarem 10 dias para acabar a promoção */
          var sCont="<div class='product-details-data-prom-date-container'>"+ rk("details-promotion-valid-until-text") +" <b class='product-details-data-prom-date'>"+ fnFormatN(dDataPromFim.getDate()) +"/"+ fnFormatN(1+dDataPromFim.getMonth()) +"/"+ dDataPromFim.getFullYear() +" "+ rk("details-promotion-valid-until-at-text") +" "+ fnFormatN(dDataPromFim.getHours()) +":"+ fnFormatN(dDataPromFim.getMinutes()) +".</b></div><div class='product-details-lats-hours'>"+ rk("details-promotion-left-text") +"</div>";
          if(dFaltam<1){
            sCont+="<div class='product-details-data-prom-container'>";
            if(iHoras>=2){
               sCont+="<div class='product-details-data-prom-time'><div class='product-details-data-prom-time-title'>"+ iHoras +"</div><div class='product-details-data-prom-time-txt'>"+ rk("details-promotion-left-hour-text") +""+ (iHoras>=1?"s</div></div>":"");
             }else if(iHoras==1){
               sCont+="<div class='product-details-data-prom-time'><div class='product-details-data-prom-time-title'>"+ iHoras +"</div><div class='product-details-data-prom-time-txt'>"+ rk("details-promotion-left-hour-text") +""+ (iHoras>=1?"</div></div>":"");
            }
            if(iMinutos>0)sCont+="<div class='product-details-data-prom-time'><div class='product-details-data-prom-time-title'>"+iMinutos+"</div><div class='product-details-data-prom-time-txt'>"+ rk("details-promotion-left-min-text") +""+(iMinutos>=1?"</div></div>":"");
            if(iSeconds>0)sCont+="<div class='product-details-data-prom-time'><div class='product-details-data-prom-time-title'>"+iSeconds+"</div><div class='product-details-data-prom-time-txt'>"+ rk("details-promotion-left-sec-text") +""+(iSeconds>=1?"</div></div>":"");
            sCont+="</div>";}
            else if(dFaltam==1){
              sCont+="<div class='product-details-data-prom-container'><div class='product-details-data-prom-time'><div class='product-details-data-prom-time-title'>"+ dFaltam +"</div><div class='product-details-data-prom-time-txt'>"+ rk("details-promotion-left-day-text") +"</div></div>";
            if(iHoras>=2){
             sCont+="<div class='product-details-data-prom-time'><div class='product-details-data-prom-time-title'>"+ iHoras +"</div><div class='product-details-data-prom-time-txt'>"+ rk("details-promotion-left-hour-text") +""+ (iHoras>=1?"s</div></div>":"");
             }else if(iHoras==1){
               sCont+="<div class='product-details-data-prom-time'><div class='product-details-data-prom-time-title'>"+ iHoras +"</div><div class='product-details-data-prom-time-txt'>"+ rk("details-promotion-left-hour-text") +""+ (iHoras>=1?"</div></div>":"");
            }
            if(iMinutos>0)sCont+="<div class='product-details-data-prom-time'><div class='product-details-data-prom-time-title'>"+iMinutos+"</div><div class='product-details-data-prom-time-txt'>"+ rk("details-promotion-left-min-text") +""+(iMinutos>=1?"</div></div>":"");
            if(iSeconds>0)sCont+="<div class='product-details-data-prom-time'><div class='product-details-data-prom-time-title'>"+iSeconds+"</div><div class='product-details-data-prom-time-txt'>"+ rk("details-promotion-left-sec-text") +""+(iSeconds>=1?"</div></div>":"");
              sCont+="</div>";
            }
        else if(dFaltam>1){sCont+="<div class='product-details-data-prom-time'><div class='product-details-data-prom-time-title'>"+ dFaltam +"</div><div class='product-details-data-prom-time-txt'>"+ rk("details-promotion-left-day-text") +"s</div></div>";}
          oOut.innerHTML=sCont;
        }
        },1000);
      }
    }
  }
}