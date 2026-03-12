// ABOUTME: Helpers for inserting outline content into the research editor.
// ABOUTME: Reuses staged empty section paragraphs so guided content does not leave visual gaps.

export function findReusableSectionParagraphRange(doc, sectionTitle) {
  let previousNode = null
  let reusableRange = null

  doc.forEach((node, offset) => {
    const isMatchingSectionHeading =
      previousNode?.type?.name === 'heading' &&
      previousNode.attrs?.level === 2 &&
      previousNode.textContent === sectionTitle
    const isEmptyParagraph =
      node.type?.name === 'paragraph' && node.content?.size === 0

    if (isMatchingSectionHeading && isEmptyParagraph) {
      reusableRange = { from: offset, to: offset + node.nodeSize }
    }

    previousNode = node
  })

  return reusableRange
}
