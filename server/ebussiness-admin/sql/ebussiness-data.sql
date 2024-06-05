use ebussiness;

insert into users(uname, upwd, icon) value ('admin', 'admin', 'mylogo.png');

insert into good_types(id, name)
values (1000, '家电'),
       (1001, '水果'),
       (1002, '文具');

insert into goods(id, name, type_id, price, count, img, suggested, ads)
values (1000, '家电1号', 1000, 10, 10, '99.jpg', 'no', 'no'),
       (1001, '水果1号', 1001, 10, 10, '101.jpg', 'no', 'yes'),
       (1002, '文具1号', 1002, 10, 10, '108.jpg', 'yes', 'no');

insert into orders(id, user_id, create_time, total_price, status)
values (1002, 1, '2022-11-01', 2343.0, '未付款'),
       (1003, 1, '2022-11-01', 264.0, '未付款'),
       (1004, 1, '2022-11-01', 281.6, '未付款');
