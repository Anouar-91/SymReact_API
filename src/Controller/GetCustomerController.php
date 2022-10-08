<?php

namespace App\Controller;

use App\Entity\Invoice;
use App\Repository\CustomerRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Security;


class GetCustomerController extends AbstractController
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
       $customers =  $this->customerRepo->findBy(["user" => $this->security->getUser()]);
       return $customers;
       
    }
}
