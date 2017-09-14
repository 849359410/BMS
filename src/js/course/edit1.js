require('../common/header.js');
require('../common/aside.js');
var util = require('../common/util.js');

/**
 * ���ܵ㣺
 * 1�����ݻ���
 * 2��ѧ�ƶ�������
 * 3�����ύ
 * */
var cs_id = util.getSearch('cs_id');

/**
 * ���ݻ��ԣ�
 * 1���õ�location.search�����cs_id
 * 2��ͨ�����id����ӿڻ�ȡ����
 * 3���õ�������Ⱦ���ģ�棬����ҳ��ָ����λ��
 * */
$.get('/v6/course/basic', { cs_id: cs_id }, function(data) {
    if(data.code == 200) {
        $('#course-edit1').append(template('course-edit1-tpl', data.result));
    }
});

/**
 * ѧ�ƶ���������
 * 1����Ϊ�������ݻ����Ƕ�̬�����ģ�����ͨ��ί�еķ�ʽ��������ѧ��select��change�¼�
 * 2���¼�����ʱ��ȡ��ѡ����ѧ��cg_id�����ýӿڻ�ȡ��Ӧ���Ӽ�ѧ���б�
 * 3���õ����ݺ�̬�����µ��Ӽ�option�����滻
 * */
$(document).on('change', '#category-top-select', function() {

    // select��value�����û���ѡ�Ķ���ѧ��cg_id
    var topCgid = $(this).val();

    // ���ö���ѧ��cg_id��ȡ��Ӧ�Ӽ�ѧ���б�
    $.get('/v6/category/child', { cg_id: topCgid }, function(data) {

        var html = '';
        var childList = data.result;

        if(data.code == 200) {
            // �����Ӽ��б�̬���ɶ�Ӧ��option
            for(var i = 0, len = childList.length; i < len; i++) {
                html += '<option value="' + childList[i].cg_id + '">' + childList[i].cg_name + '</option>'
            }
        }

        // ʹ���µ�option�����滻
        $('#category-child-select').html(html);
    });
});

/**
 * ���ύ��
 * 1��ʹ��ajaxForm������ί�з�ʽ��תajax
 * 2���༭�ɹ��������ʾ��Ȼ����ת���༭�ڶ���ҳ��(��תʱ��Ҫ������cs_id���ݹ�ȥ)
 * */
$('#course-edit1-form').ajaxForm({
    delegation: true,
    success: function(data) {
        if(data.code == 200) {
            alert('�޸ĳɹ�');
            location.href = '/dist/html/course/edit2.html?cs_id=' + cs_id;
        }
    }
});