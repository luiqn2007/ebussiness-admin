drop database if exists ebussiness;
create database ebussiness;
use ebussiness;

drop table if exists users;
create table users(
    id int primary key auto_increment,
    uname varchar(20) not null unique,
    upwd varchar(20) not null,
    icon varchar(200)
);

insert into users(uname, upwd, icon) value ('admin', 'admin', 'mylogo.png');

drop table if exists good_types;
create table good_types(
    id int primary key auto_increment,
    name varchar(20) not null
);

insert into good_types(id, name)
values (1000, '家电'),
       (1001, '水果'),
       (1002, '文具');

drop table if exists goods;
create table goods(
    id int primary key auto_increment,
    name varchar(20) not null,
    type_id int not null,
    price decimal(10,2) not null,
    count long not null,
    img varchar(20),
    suggested varchar(3) not null,
    ads varchar(3) not null,

    foreign key (type_id) references good_types(id),
    constraint check (suggested in ('yes', 'no')),
    constraint check (ads in ('yes', 'no')),
    constraint check (count >= 0),
    constraint check (price >= 0)
);

insert into goods(id, name, type_id, price, count, img, suggested, ads)
values (1000, '家电1号', 1000, 10, 10, '99.jpg', 'no', 'no'),
       (1001, '水果1号', 1001, 10, 10, '101.jpg', 'no', 'yes'),
       (1002, '文具1号', 1002, 10, 10, '108.jpg', 'yes', 'no');

drop table if exists orders;
create table orders(
    id int primary key auto_increment,
    user_id int not null,
    money decimal(10,2) not null,
    date datetime not null default now(),
    status varchar(20) not null,

    foreign key (user_id) references users(id),
    constraint check (status in ('已支付', '未支付')),
    constraint check (money >= 0)
);

insert into orders(id, user_id, date, money, status)
values (1002, 1, '2022-11-01', 2343.0, '未支付'),
       (1003, 1, '2022-11-01', 264.0, '未支付'),
       (1004, 1, '2022-11-01', 281.6, '已支付');
