$(function(){
    $("#doubanid").blur(function(){
        var id=  $(this).val();
        $.ajax({
            url:'https://api.douban.com/v2/movie/'+id,
            dataType:"jsonp",
            jsonp:"callback",
            success:function(data){
                $("#inputTitle").val(data.alt_title);
                $("#inputDoctor").val(data.author[0].name);
                $("#inputCountry").val(data.attrs.country.join(','));
                $("#inputLanguage").val(data.attrs.language.join(','));
                $("#inputPicture").val(data.image);
            }
        });
    })
})
