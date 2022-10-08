<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\CustomerRepository;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class GetCustomersController extends AbstractController
{
    private $customerRepo;
    private $security;
    public function __construct( CustomerRepository $customerRepo, Security $security)
    {   
        $this->security = $security;
        $this->customerRepo = $customerRepo;
    }


    public function __invoke()
    {
        if($this->security->isGranted("ROLE_ADMIN", $this->security->getUser()) || !$this->security->getUser() instanceof User ){
            return $this->customerRepo->findAll();
       }
       $customers =  $this->customerRepo->findBy(["user" => $this->security->getUser()]);
       return $customers;
       
    }
}
