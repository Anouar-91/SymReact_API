<?php

namespace App\Controller;

use App\Entity\Invoice;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class InvoiceIncrementationController 
{
    private $manager;
    public function __construct(EntityManagerInterface $entityManager)
    {   
        $this->manager = $entityManager;
    }

    /**
     * @Route(
     *     name="invoice_post_increment",
     *     path="/api/invoice/{id}/incrementation",
     *     methods={"POST"},
     *     defaults={
     *         "_api_resource_class"=Invoice::class,
     *         "_api_item_operation_name"="invoice_post_increment"
     *     }
     * )
     */
    public function __invoke(Invoice $data): Invoice
    {
        $data->setChrono($data->getChrono() + 1);

        $this->entityManager->flush();

        return $data;
    }
}
