require('../common/header.js');
require('../common/aside.js');
var util = require('../common/util.js');

/**
 * ���ܵ�:
 * 1.���ݻ���
 * 2.���ύ
 * 3.ѧ�ƶ�������
 * */
var cs_id = util.getSearch('cs_id');

/**
 * ���ݻ���:
 * 1.�õ�location.search�����cs_id
 * 2.ͨ�����id����ӿڻ�ȡ����
 * 3.�õ�������Ⱦ���ģ��,����ҳ��ָ��λ��
 * */
$.get('/v6/course/basic',{ cs_id:cs_id },function(data){
    if(data.code == 200){
        $('#course-edit1').append(template('course-edit1-tpl',data.result));
    }
});
