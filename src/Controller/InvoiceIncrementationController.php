<?php

namespace App\Controller;

use App\Entity\Invoice;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class InvoiceIncrementationController extends AbstractController
{
    private $manager;
    public function __construct(EntityManagerInterface $entityManager)
    {   
        $this->manager = $entityManager;
    }


    public function __invoke(Invoice $data): Invoice
    {
        $data->setChrono($data->getChrono() + 1);

        $this->manager->flush();

        return $data;
    }
}
