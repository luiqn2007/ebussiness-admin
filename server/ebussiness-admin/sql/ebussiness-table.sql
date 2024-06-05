drop database if exists ebussiness;
create database ebussiness;
use ebussiness;

drop table if exists users;
create table users(
    id int primary key auto_increment,
    uname varchar(20) not null,
    upwd varchar(20) not null,
    icon varchar(200)
);

drop table if exists good_types;
create table good_types(
    id int primary key auto_increment,
    name varchar(20) not null
);

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
