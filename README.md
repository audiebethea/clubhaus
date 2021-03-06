# CLUBHAUS

Last Updated 9/10/2019

## Description

Clubhaus is a website designed for university students to quickly and accurately find
organizations on their campus that suit their interests. Users will be asked to select
their university from the list of supported universities (currently 
The University of Texas at Austin, Texas Christian University, Texas A&M University College 
Station, and Indiana University Bloomington) and fill out a questionnaire regarding
their hobbies as well as their political, religious, and cultural interests. Once complete,
the user will be shown a list of clubs that match their interests, sorted in terms of 
compatibility.

## Purpose

Clubhaus was created with the goal of supplying university students with a way
to easily and efficiently find organizations around their campus that interest them
while filtering out organizations that they would probably not pursue. The sheer number
of organizations at a university can be overwhelming, and it is very hard to sift through
them and find one that feels like a fit for you. Clubhaus is a tool students can use
to narrow down their list of possible organizations as well as supply more information
about each of those clubs.

## Implementation

Clubhaus was created using ReactJS as a fronted with multiple Material-UI components
to retain visual consistency across the website. A NodeJS/Express API was used to handle
requests sent by the frontend and feed them to a Google Cloud Postgresql database, which contained
the information on the clubs, as well as filter and sort that data to determine compatibility.
Lastly, the information about the clubs was scraped from organization web pages for each 
university using Chrome's puppeteer.

## Progress

Clubhaus is currently finished and will be deployed soon.