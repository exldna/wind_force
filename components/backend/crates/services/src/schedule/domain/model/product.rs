use derive_getters::{Dissolve, Getters};
use thiserror::Error;

/// Represents the type of job that instructors might have.
#[derive(Clone, Debug, Getters)]
pub struct Product {
    /// [Product] unique identifier.
    ///
    /// We use it to distinguish two different products.
    id: ProductId,

    /// Product public name.
    ///
    /// We keep the names unique to avoid potential confusion.
    name: ProductName,
}

impl Product {
    /// Creates new [Product].
    pub const fn new(id: ProductId, name: ProductName) -> Self {
        Product { id, name }
    }
}

impl PartialEq for Product {
    fn eq(&self, other: &Self) -> bool {
        self.id == other.id
    }
}

/// [Product] unique identifier.
///
/// We use _UUIDs_ as [Product]s identifiers.
pub type ProductId = uuid::Uuid;

/// A valid product name.
///
/// Note that empty string is invalid product name.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct ProductName(String);

#[derive(Debug, Error)]
#[error("product name cannot be empty")]
pub struct ProductNameEmptyError;

impl ProductName {
    /// Creates new [ProductName] from string.
    ///
    /// # Errors
    /// - [ProductNameEmptyError] if given string is empty or consists only of whitespace.
    ///
    /// # Examples
    /// ```
    /// # use services::schedule::domain::model::product::ProductName;
    /// #
    /// assert!(ProductName::from_raw("Training").is_ok());
    /// assert!(ProductName::from_raw("").is_err());
    /// assert!(ProductName::from_raw("\t\t ").is_err());
    /// ```
    pub fn from_raw(raw: &str) -> Result<Self, ProductNameEmptyError> {
        let trimmed = raw.trim();
        if trimmed.is_empty() {
            return Err(ProductNameEmptyError {});
        }
        Ok(ProductName {
            0: trimmed.to_string(),
        })
    }

    /// Returns reference to valid name.
    pub fn as_str(&self) -> &str {
        &self.0
    }
}

impl std::fmt::Display for ProductName {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str(&self.0)
    }
}

#[derive(Clone, Debug, Getters, Dissolve)]
pub struct CreateProductRequest {
    name: ProductName,
}

impl CreateProductRequest {
    pub fn new(name: ProductName) -> Self {
        CreateProductRequest { name }
    }
}

#[derive(Debug, Error)]
pub enum CreateProductError {
    #[error("product with name {0} already exists")]
    AlreadyExists(ProductName),
    #[error(transparent)]
    Internal(#[from] anyhow::Error),
}
