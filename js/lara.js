
var Lara = (function (){
	var domain = 'http://weblog.test/';
	
	var Lara = {
		articles : domain + 'api/v1/articles?include=user,category',
		pulldown : domain + 'api/v1/pulldown?include=user,category',
		tags     : domain + 'api/v1/tags',
		search   : domain + 'api/v1/search?include=user,category',
		nav      : domain + 'api/v1/categories',
		article  : domain + 'api/v1/article/',
		getArticleList : function (dom, data, after){
			for(var i=0; i<data.data.length; i++){
				var div = document.createElement('div');
				div.className = "mui-card";
				div.setAttribute("aid",data.data[i].id);
				
				var htmlStr = '';
				htmlStr += '<div class="mui-card-header mui-card-media" style="height: 40vw;background-image: url('+data.data[i].thumb+');"><p>' +data.data[i].title+ '</p></div>';
				htmlStr += '<div class="mui-card-content">';
				htmlStr += '<div class="mui-card-content-inner">';
				htmlStr += '<p><span>' +data.data[i].user.username+ '</span> 发布于 ' +data.data[i].created_at+ '</p>';
				htmlStr += '<p style="color: #333;">' +data.data[i].description+ '</p>';
				htmlStr += '</div>';
				htmlStr += '</div>';
				htmlStr += '<div class="mui-card-footer">';
				htmlStr += '<a class="mui-card-link">点击<span class="mui-badge mui-badge-inverted">' +data.data[i].views+ '</span></a>';
				htmlStr += '<a class="mui-card-link">评论<span class="mui-badge mui-badge-inverted">' +data.data[i].comments+ '</span></a>';
				htmlStr += '<a class="mui-card-link">阅读更多...</a>';
				htmlStr += '</div>';
				htmlStr += '</div>';
				
				div.innerHTML = htmlStr;
				
				if(after){
					dom.appendChild(div);
				}else{
					dom.insertBefore(div, dom.firstChild);
				}
			}
		},
		getDetail : function (url, params){
			return	{
				url : url,
				id :  url,
				styles : {},
				extras : params,
				show : {
					autoShow : true,
					aniShow : 'slide-in-right',
					duration : 100
				},
				waiting : {
					autoShow : true,
					title : '正在加载...'
				}
			}
		},
		getList : function (url,params){
			return	{
				url : url,
				id :  url,
				styles : {},
				extras : params,
				show : {
					autoShow : true,
					aniShow : 'slide-in-right',
					duration : 100
				},
				waiting : {
					autoShow : true,
					title : '正在加载...'
				}
			}
		},
		getTagList : function (dom, data){
			for(var i=0; i<data.data.length; i++){
				var li = document.createElement('li');
				li.className = "mui-table-view-cell";
				li.setAttribute("keywords", data.data[i].name);
				
				var htmlStr = '<a class="mui-navigate-right"><span class="mui-badge mui-badge-tips">' +data.data[i].article_count+ '</span>' +data.data[i].name+ '</a>';
				li.innerHTML = htmlStr;
				
				dom.appendChild(li);
			}
		},
		getSearchList : function (dom, data){
			for(var i=0; i<data.data.length; i++){
				var li = document.createElement('li');
				li.className = "mui-table-view-cell mui-media";
				li.setAttribute("aid", data.data[i].id);
				
				var htmlStr = '<a href="javascript:;">';
				htmlStr += '<img class="mui-media-object mui-pull-left" src="'+data.data[i].thumb+'">';
				htmlStr += '<div class="mui-media-body">';
				htmlStr += '<div class="mui-ellipsis-2">' +data.data[i].title+ '</div>';
				htmlStr += '</div>';
				htmlStr += '<div class="meta-info">';
				htmlStr += '<div class="author">' +data.data[i].category.name+ '</div>';
				htmlStr += '<div class="time">' +data.data[i].created_at+ '</div>';
				htmlStr += '</div>';
				htmlStr += '</a>';
				
				li.innerHTML = htmlStr;
				dom.appendChild(li);
			}
		},
		getNavList : function (dom, data){
			for(var i=0; i<data.data.length; i++){
				var li = document.createElement("li");
				li.className = "mui-table-view-cell";
				li.setAttribute("catid", data.data[i].id);
				li.setAttribute("catname", data.data[i].name);
				
				var htmlStr = '<a class="mui-navigate-right">' +data.data[i].name+ '</a>';
				li.innerHTML = htmlStr;
				
				dom.appendChild(li);
			}
		},
		getArticleDetail : function (dom, data){
			document.querySelector(".article-thumb").src = data.thumb;
			document.querySelector(".article-title").innerText = data.title;
			document.querySelector(".article-author").innerText = data.user.username;
			document.querySelector(".article-time").innerText = data.created_at;
			document.querySelector(".article-article").innerHTML = data.content;
			
			if(data.comment.data.length){
				for(var i=0; i<data.comment.data.length;i++){
					var div = document.createElement("div");
					div.className = "mui-card";
					
					var htmlStr = '<div class="mui-card-header mui-card-media" style="border: none;">';
					htmlStr += '<img src="' +data.comment.data[i].user.avatar+ '" />';
					htmlStr += '<div class="mui-media-body">' +data.comment.data[i].user.username+ '<p>' +data.comment.data[i].created_at+ '</p></div>';
					htmlStr += '</div>';
					htmlStr += '<div class="mui-card-content">' +data.comment.data[i].content+ '</div>';
					
					div.innerHTML = htmlStr;
					dom.appendChild(div);
				}
			}else{
				var div = document.createElement("div");
				div.className = "no-comments";
				div.innerHTML = "精彩评论虚位以待";
				
				dom.appendChild(div);
			}
		}
	};
	
	return Lara;
})();





