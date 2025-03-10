// Função para ordenar itens por preço
function ordenarItensPorPreco() {
    orcamentoAtual.itens.sort((a, b) => a.preco - b.preco);
    salvarOrcamento();
    atualizarInterface();
}

// Função para exportar para PDF
function exportarParaPDF() {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Orçamento: ${orcamentoAtual.nome}`, 10, 10);

    let y = 20;
    orcamentoAtual.itens.forEach((item, index) => {
        const subtotal = item.quantidade * item.preco;
        doc.setFontSize(12);
        doc.text(`${index + 1}. ${item.nome} (${item.quantidade}x) - R$ ${subtotal.toFixed(2)}`, 10, y);
        y += 10;
    });

    doc.setFontSize(14);
    doc.text(`Total: R$ ${orcamentoAtual.total.toFixed(2)}`, 10, y + 10);

    doc.save(`orcamento_${orcamentoAtual.nome}.pdf`);
}

// Função para fazer backup
function fazerBackup() {
    const orcamentos = JSON.parse(localStorage.getItem('orcamentos')) || [];
    const blob = new Blob([JSON.stringify(orcamentos)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'backup_orcamentos.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Função para restaurar backup
function restaurarBackup() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const orcamentos = JSON.parse(e.target.result);
            localStorage.setItem('orcamentos', JSON.stringify(orcamentos));
            alert("Backup restaurado com sucesso!");
            window.location.reload();
        };
        reader.readAsText(file);
    };
    input.click();
}