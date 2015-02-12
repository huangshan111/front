/**
 * Created by Administrator on 2014/12/30.
 */
'use strict';

module.exports=function(grunt){
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var config={
        app:'app',
        dist:'dist'
    }

    grunt.initConfig({
        config:config,

        copy:{
            dist_html:{
                files:{
                    '<%=config.dist%>/index.html': '<%=config.app%>/index.html',
                    '<%=config.dist%>/js/index.js':'<%=config.app%>/js/index.js'
                }
            }

        },

        clean:{
            dist_html:{
                src:['<%=config.dist%>/**/*'],
                filter:function(filepath){
                    return (!grunt.file.isDir(filepath));
                }

            }
        }

    });
}

