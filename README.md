# Intellectual-Identity-ethereum
An intellectual property (IP) right for a technical invention. It allows to prevent others from using once's invention and decide who is allowed to produce, sell or import your invention in those countries in which you own a valid patent. Right now this right  of ownership is given through patent and trademark offices based on different countries law. However, NFT tokens of blockchain technology functionality also allow users to prove their ownership of any piece of content, which is not possible with traditional IP rights tools like trademarks and copyrights.

![Ethereum-Blockchain](https://github.com/RYees/dapps-gps/blob/main/images/copy.png)(https://github.com/RYees/dapps-gps/blob/main/images/ether.jpg)

# Table of content
* [Overview](#overview)
* [Introduction](#introduction)
* [Workflow](#workflow)
* [Implementation](#implementation)


## Overview
This project is about transferring the current process of granting ownership for intellectual property on ethereum blockchain, using the use case of NFTs. Where NFTs are digital representations of assets and have been likened to digital passports because each token contains a unique, non-transferable identity to distinguish it from other token. So we will use them to assign to each intellectual property.


## Introduction
As indicated in the overview this project main objective is to build a web dapp to produce Nfts for Intellectual property of a users if the specified contract condition are met. In this spirit, the following tasks will be done:
* A function where users can request ownership to there intellectual property on the blockchain
* A function to hold users to wait until a verification is given to them for their request.
* When someone request for ownership, they first need to make a deposit to the contract , if the verification of the request fails the deposited money will be refunded to the users but if the verification for ownership is pass, the deposit money will be considered a fee for the verification service.
* A function where conditions will be specified for a verified IP, like the time period limit for how long the IP will be held by the user. 
* Once ownership is verified, a function to other users’ to bid a money on the IP ownership they want in case the user is interested to sell it.
* A function if the user somewhat decide to sell its IP ownership , a commission fee must be made to the contract owners.


## Workflow
Steps to do the project:
* Developing smart contract. 
   * With solidity programming
   * Testing and deploying the contract on ethereum blockchain
* Building frontend web dApp
   * Designing the user interface
